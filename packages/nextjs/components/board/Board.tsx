import { useState, useRef } from "react";
import {
  useScaffoldContractRead,
  useScaffoldContractWrite
} from "~~/hooks/scaffold-eth";
import { Cell } from "./Cell";
import { Troop } from "./Troop";

export const Board = () => {
  const { data: gridData } = useScaffoldContractRead({
    contractName: "BattleForETH",
    functionName: "getGrid",
  });
 
  // const { writeAsync: moveItem, isLoading } = useScaffoldContractWrite({
  //   contractName: "BattleForETH",
  //   functionName: "moveItem",
  //   args: [selectedIndex],
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  return (
    <div>
      <div className="flex">
        <div>
          <h2 className="mt-4 text-3xl">Field</h2>
          <div className="flex flex-wrap" style={{ width: "450px"}}>
            {gridData && gridData.map((item, index) => (
              <Cell key={item.id.toString()} id={item.id.toString()} content={item.content.toString()} type={item.typeGrid} index={index} hp={item.hp.toString()} gridData={gridData}/>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mt-4 text-3xl">Drag and Drop Troop</h2>
          <div className="flex flex-wrap" style={{ width: "500px"}}>
            <Troop />
          </div>
        </div>
      </div>
    </div>
  );
}