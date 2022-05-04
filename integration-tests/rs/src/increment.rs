use serde_json::json;
use near_units::parse_near;
use workspaces::prelude::*;

const WASM_FILEPATH: &str = "../../out/counter.wasm";

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

    // begin test
    let start_counter: u64 = alice
        .call(&worker, contract.id(), "get_num")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    alice
        .call(&worker, contract.id(), "increment")
        .args_json(json!({}))?
        .transact()
        .await?;

    let end_counter: u64 = alice
        .call(&worker, contract.id(), "get_num")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    assert_eq!(end_counter, start_counter + 1);
    println!("Passed ✅");
    Ok(())
}