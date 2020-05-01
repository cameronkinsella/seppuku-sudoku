import React, {useState} from "react";
import {useTable} from "react-table";
import '../App.scss';

function setNumbers(nums) {
  
  let out = [];

  for (let i = 0; i < 9; i++) {
    out.push({
      col1: nums[i][0],
      col2: nums[i][1],
      col3: nums[i][2],
      col4: nums[i][3],
      col5: nums[i][4],
      col6: nums[i][5],
      col7: nums[i][6],
      col8: nums[i][7],
      col9: nums[i][8]
    });
  }

  return out;
}

export default function Table({output}) {
   const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  const columns = React.useMemo(
    () => [
      {
        accessor: "col1", // accessor is the "key" in the data
        Cell: <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col2",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col3",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col4",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col5",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col6",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col7",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col8",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      },
      {
        accessor: "col9",
        Cell:  <input type="number" min="1" max="9" maxLength = "1" onInput={maxLengthCheck}/>
      }
    ],
    []
  );


  const data = React.useMemo(
    () => setNumbers(output),
    [output]
  );

  // Use the state and functions returned from useTable to build your UI
  const {getTableProps, getTableBodyProps, rows, prepareRow} = useTable({
    columns,
    data
  });

  // Render the UI for your table
  const borderCheck = (i, j) => {
    let style = {
      borderRightWidth: "1px",
      borderBottomWidth: "1px"
    };

    if ((j + 1) % 3 === 0 && j !== 8) {
      style.borderRightWidth = "3px"
    }
    if ((i + 1) % 3 === 0 && i !== 8) {
      style.borderBottomWidth = "3px"
    }

    return style
  };
  return (
    <div className="SudokuBoard">
      <table {...getTableProps()}>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {

          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, j) => {
                return <td
                  style={borderCheck(i, j)} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}