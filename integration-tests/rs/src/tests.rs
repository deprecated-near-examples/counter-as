use serde_json::json;
use near_units::parse_near;
use workspaces::prelude::*; 
use workspaces::{network::Sandbox, Account, Contract, Worker};

const WASM_FILEPATH: &str = "../../out/main.wasm";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let wasm = std::fs::read(WASM_FILEPATH)?;
    let contract = worker.dev_deploy(&wasm).await?;

    // create accounts
    let owner = worker.root_account();
    let alice = owner
    .create_subaccount(&worker, "alice")
    .initial_balance(parse_near!("30 N"))
    .transact()
    .await?
    .into_result()?;

    // begin tests  
    test_increment(&alice, &contract, &worker).await?;
    test_decrement(&alice, &contract, &worker).await?;
    test_reset(&alice, &contract, &worker).await?;
    Ok(())
}   

async fn test_increment(
    user: &Account,
    contract: &Contract,
    worker: &Worker<Sandbox>,
) -> anyhow::Result<()> {
    let start_counter: u64 = user
        .call(&worker, contract.id(), "get_num")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    user
        .call(&worker, contract.id(), "increment")
        .args_json(json!({}))?
        .transact()
        .await?;

    let end_counter: u64 = user
        .call(&worker, contract.id(), "get_num")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    assert_eq!(end_counter, start_counter + 1);
    println!("      Passed ✅ can be incremented");
    Ok(())
}

async fn test_decrement(
    user: &Account,
    contract: &Contract,
    worker: &Worker<Sandbox>,
) -> anyhow::Result<()> {
    user
        .call(&worker, contract.id(), "increment")
        .args_json(json!({}))?
        .transact()
        .await?;

    let start_counter: u64 = user
        .call(&worker, contract.id(), "get_num")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    user
        .call(&worker, contract.id(), "decrement")
        .args_json(json!({}))?
        .transact()
        .await?;

    let end_counter: u64 = user
        .call(&worker, contract.id(), "get_num")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    assert_eq!(end_counter, start_counter - 1);
    println!("      Passed ✅ can be decremented");
    Ok(())
}

async fn test_reset(
    user: &Account,
    contract: &Contract,
    worker: &Worker<Sandbox>,
) -> anyhow::Result<()> {
    user
        .call(&worker, contract.id(), "increment")
        .args_json(json!({}))?
        .transact()
        .await?;

    user
        .call(&worker, contract.id(), "increment")
        .args_json(json!({}))?
        .transact()
        .await?;

    user
        .call(&worker, contract.id(), "reset")
        .args_json(json!({}))?
        .transact()
        .await?;

    let end_counter: u64 = user
        .call(&worker, contract.id(), "get_num")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    assert_eq!(end_counter, 0);
    println!("      Passed ✅ can be reset");
    Ok(())
}