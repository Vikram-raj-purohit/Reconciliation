
function createAndAppendOption(selectElement, header) {
  const option = document.createElement('option');
  option.value = header;
  option.text = header;
  selectElement.appendChild(option);
}

function populateColumnOptions(
  headers, 
  transactionColumnSelect, 
  transactionColumnSelectalternate, 
  statusColumnSelect, 
  amountColumnSelect
) {
  // Clear existing options
  [transactionColumnSelect, transactionColumnSelectalternate, statusColumnSelect, amountColumnSelect]
    .forEach(select => select.innerHTML = '');

  // Populate new options
  headers.forEach(header => {
    createAndAppendOption(transactionColumnSelect, header);
    createAndAppendOption(transactionColumnSelectalternate, header);
    createAndAppendOption(statusColumnSelect, header);
    createAndAppendOption(amountColumnSelect, header);
  });
}

let columnSelectors = {};

function handleFileSelection(event) {
  const fileNumber = event.target.getAttribute('data-file-number');
  
  const file = event.target.files[0];
  const reader = new FileReader();
  
  columnSelectors[`transactionColumnSelect${fileNumber}`] = document.getElementById(`transactionColumn${fileNumber}`);
    columnSelectors[`transactionColumnalternate${fileNumber}`] = document.getElementById(`transactionColumnalternate${fileNumber}`);
    columnSelectors[`statusColumnSelect${fileNumber}`] = document.getElementById(`statusColumn${fileNumber}`);
    columnSelectors[`amountColumnSelect${fileNumber}`] = document.getElementById(`amountColumn${fileNumber}`);
   
  reader.onload = e => {
      const contents = e.target.result;
      const data = parseCSV(contents);
      const headers = Object.keys(data[0]);
      
      populateColumnOptions(
          headers,
          document.getElementById(`transactionColumn${fileNumber}`),
          document.getElementById(`transactionColumnalternate${fileNumber}`),
          document.getElementById(`statusColumn${fileNumber}`),
          document.getElementById(`amountColumn${fileNumber}`)
      );
  };

  reader.readAsText(file);
}
  
  document.addEventListener('DOMContentLoaded', function () {
    // transactionColumnSelect1 = document.getElementById('transactionColumn1');
    // transactionColumnalternate1 = document.getElementById('transactionColumnalternate1');
    // statusColumnSelect1 = document.getElementById('statusColumn1');
    // amountColumnSelect1 = document.getElementById('amountColumn1');
   
    // transactionColumnSelect2 = document.getElementById('transactionColumn2');
    // transactionColumnalternate2 = document.getElementById('transactionColumnalternate2');
    // statusColumnSelect2 = document.getElementById('statusColumn2');
    // amountColumnSelect2 = document.getElementById('amountColumn2');

    // transactionColumnSelect3 = document.getElementById('transactionColumn3');
    // transactionColumnalternate3 = document.getElementById('transactionColumnalternate3');
    // statusColumnSelect3 = document.getElementById('statusColumn3');
    // amountColumnSelect3 = document.getElementById('amountColumn3');

    // transactionColumnSelect4 = document.getElementById('transactionColumn4');
    // transactionColumnalternate4 = document.getElementById('transactionColumnalternate4');
    // statusColumnSelect4 = document.getElementById('statusColumn4');
    // amountColumnSelect4 = document.getElementById('amountColumn4');
    
    
    const csvFiles = document.querySelectorAll('[data-file-number]');
    
    csvFiles.forEach(csvFile => {
        csvFile.addEventListener('change', handleFileSelection);
    });
    
  });
  

  
        function processFiles() {

          function readAndParseCSV(file, callback) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                const parsedData = parseCSV(contents);
                callback(parsedData);
            };
            reader.readAsText(file);
        }
          const csvFile1 = document.getElementById('csvFile1').files[0];
          const csvFile2 = document.getElementById('csvFile2').files[0];
          const csvFile3 = document.getElementById('csvFile3').files[0];
  
          const transactionColumnIndex1 = columnSelectors.transactionColumnSelect1.value;
          const transactionColumnalternateIndex1 =columnSelectors.transactionColumnalternate1.value;
    const statusColumnIndex1 = columnSelectors.statusColumnSelect1.value;
    const amountColumnIndex1 = columnSelectors.amountColumnSelect1.value;
    
    const transactionColumnIndex2 = columnSelectors.transactionColumnSelect2.value;
    const transactionColumnalternateIndex2 = columnSelectors.transactionColumnalternate2.value;
    const statusColumnIndex2 = columnSelectors.statusColumnSelect2.value;
    const amountColumnIndex2 = columnSelectors.amountColumnSelect2.value;
   
    let transactionColumnIndex3 = null;
let transactionColumnalternateIndex3 = null;
let statusColumnIndex3 = null;
let amountColumnIndex3 = null;

if (csvFile3) {
    transactionColumnIndex3 = columnSelectors.transactionColumnSelect3.value;
    transactionColumnalternateIndex3 = columnSelectors.transactionColumnalternate3.value;
    statusColumnIndex3 = columnSelectors.statusColumnSelect3.value;
    amountColumnIndex3 = columnSelectors.amountColumnSelect3.value;
}
  
  
    if (!transactionColumnIndex1 || !statusColumnIndex1 || !amountColumnIndex1 || !transactionColumnIndex2 || !statusColumnIndex2 || !amountColumnIndex2  ) {
      alert('Please select valid transaction, amount and status columns for both CSV files.');
      return;
    }
    readAndParseCSV(csvFile1, (data1) => {
      readAndParseCSV(csvFile2, (data2) => {
          if (csvFile3) {
              readAndParseCSV(csvFile3, (data3) => {
                  // Your processData function
                  processData(data1, data2, data3 ,transactionColumnIndex1, transactionColumnalternateIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, transactionColumnalternateIndex2, statusColumnIndex2, amountColumnIndex2, transactionColumnIndex3, transactionColumnalternateIndex3, statusColumnIndex3, amountColumnIndex3);
              });
          } else {
              // Your processData function
              processData(data1, data2, null ,transactionColumnIndex1, transactionColumnalternateIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, transactionColumnalternateIndex2, statusColumnIndex2, amountColumnIndex2, null, null, null, null);
          }
      });
  });
}


  function parseCSV(csvContent) {
    const rows = csvContent.split('\n');
    const data = [];
    const headers = rows[0].split(',');
  
    const updatedHeaders = [];
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] === 'notes') {
        updatedHeaders.push('notes.transaction_id', 'notes.txn_uuid');
      } else {
        updatedHeaders.push(headers[i]);
      }
    }
  
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].replace(/\r/g, '').replace(/'/g, '').replace(/"/g, '').split(',');
      if (row.length === updatedHeaders.length) {
        const rowData = {};
        for (let j = 0; j < updatedHeaders.length; j++) {
          const cellData = row[j].replace(/"/g, ''); // Remove double quotes
          if (updatedHeaders[j].startsWith('notes.')) {
            // Handle the notes subfields
            const subfieldName = updatedHeaders[j].split('.')[1];
            rowData[subfieldName] = cellData.replace('{transaction_id:', ''); // Store notes as plain text
          } else {
            rowData[updatedHeaders[j]] = cellData.replace('{transaction_id:', '');;
          }
        }
        data.push(rowData);
      }
    }
  
    return data;
  }
  
  const SUCCESS = "SUCCESS";
const FAILED = "FAILED";
const PENDING = "PENDING";

function normalizeOrderID(orderID) {
  return String(orderID).trim().replace(/^winzo-|-1$/g, '').replace(/'/g, '').replace(/"/g, '');
}
  
function normalizeStatus(status) {
  const statusUpper = status.toUpperCase();
  switch(statusUpper) {
    case "FAILURE":
    case "FAILED":
    case "REVERSED":
      return FAILED;
    case "CAPTURED":
    case "PROCESSED":
      return SUCCESS;
    case "CREATED":
    case "PROCESSING":
      return PENDING;
    default:
      return statusUpper;
  }
}
 async function processData(data1, data2, data3, transactionColumnIndex1, transactionColumnalternateIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, transactionColumnalternateIndex2, statusColumnIndex2, amountColumnIndex2, transactionColumnIndex3, transactionColumnalternateIndex3, statusColumnIndex3, amountColumnIndex3) {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
   

    const matchedOrderIDs = new Set();
    const transactionStatusMap = {}; // To keep track of transaction statuses    

    // Identify matched order IDs from data2
  //   data2.forEach((row) => {
  //     const orderID = normalizeOrderID(row[transactionColumnIndex2])
  //     const status = normalizeStatus(row[statusColumnIndex2]);
  //     matchedOrderIDs.add(orderID);
  //     // Check if the transaction ID exists in the map
  // if (transactionStatusMap[orderID]) {
  //   // If the current status is "SUCCESS" or the existing status is "FAILED", update the status
  //   if (status === "SUCCESS" || transactionStatusMap[orderID] === "USER_DROPPED") {
  //     transactionStatusMap[orderID] = status;
  //   }
  // } else {
  //   // Otherwise, set the status to the current status
  //   transactionStatusMap[orderID] = status;
  // }
  //   });
    
    // Filter data3 to include only matched order IDs
    const matchedData3 = await data3 ? data3.filter((row) => {
      const orderID = normalizeOrderID(row[transactionColumnIndex3])
      return matchedOrderIDs.has(orderID);
    }):[]
        // Create a map of order IDs to statuses and amounts from both CSV files
        const orderDataMap = {};
  
    //     data1.forEach((row) => {
    //       const orderID = normalizeOrderID(row[transactionColumnIndex1]) 
          
    //       const status = normalizeStatus(row[statusColumnIndex1]);
         
     
    // });
  
     

    matchedData3.forEach((row) => {
      const orderID = normalizeOrderID(row[transactionColumnIndex3]) 
      const status1 = normalizeStatus(row[statusColumnIndex3]);
      const amount1 = typeof row[amountColumnIndex3] === 'number'
        ? row[amountColumnIndex3]
        : row[amountColumnIndex3]
          ? parseFloat(row[amountColumnIndex3].replace(/,/g, ''))
          : 0;
    
      orderDataMap[orderID] = { status1, amount1 };
    });

    
   // Append matched data from data3 to data1
const appendedRows = await data1.map((row) => {
  const orderID = normalizeOrderID(row[transactionColumnIndex1]) || normalizeOrderID(row[transactionColumnalternateIndex1])
  if (orderDataMap[orderID]) {
    const { status1, amount1 } = orderDataMap[orderID];
    return {
      ...row,
      status1: status1 || '',
      amount1: amount1 || '',
    };
  }
  return row;
});
   

  
    data1.forEach((row) => {
      const orderID = normalizeOrderID(row[transactionColumnIndex1]) || normalizeOrderID(row[transactionColumnalternateIndex1])
      const status = normalizeStatus(row[statusColumnIndex1]);
      const amount = typeof row[amountColumnIndex1] === 'number'
        ? row[amountColumnIndex1]
        : row[amountColumnIndex1]
          ? parseFloat(row[amountColumnIndex1].replace(/,/g, ''))
          : 0;
      if (!orderDataMap[orderID]) {
        orderDataMap[orderID] = { status1: status, status2: null, amount1: amount, amount2: null };
      } else {
        orderDataMap[orderID].amount1 += amount;
      }
    });

    


  
    data2.forEach((row) => {
      const orderID = normalizeOrderID(row[transactionColumnIndex2]) || normalizeOrderID(row[transactionColumnalternateIndex2])
     
      const status = normalizeStatus(row[statusColumnIndex2])

      const amount = typeof row[amountColumnIndex2] === 'number'
        ? row[amountColumnIndex2]
        : row[amountColumnIndex2]
          ? parseFloat(row[amountColumnIndex2].replace(/,/g, ''))
          : 0;
          // console.log(orderID , amount)

          matchedOrderIDs.add(orderID);
          // Check if the transaction ID exists in the map
      if (transactionStatusMap[orderID]) {
        // If the current status is "SUCCESS" or the existing status is "FAILED", update the status
        if (status === "SUCCESS" || transactionStatusMap[orderID] === "USER_DROPPED") {
          transactionStatusMap[orderID] = status;
        }
      } else {
        // Otherwise, set the status to the current status
        transactionStatusMap[orderID] = status;
      }

      if (!orderDataMap[orderID]) {
        orderDataMap[orderID] = { status1: null, status2: status, amount1: null, amount2: amount };
      } else {
        orderDataMap[orderID].status2 = status;
        orderDataMap[orderID].amount2 = amount;
      }

      if (transactionStatusMap[orderID]) {
        // If the current status is "SUCCESS" or the existing status is "FAILED", update the status
        if (status === "SUCCESS" || transactionStatusMap[orderID] === "USER_DROPPED") {
          transactionStatusMap[orderID] = status;
        }
      } else {
        // Otherwise, set the status to the current status
        transactionStatusMap[orderID] = status;
      }
    });

    // Filter out unmatched rows between Data1 and Data3
const unmatchedRows = data3 ? data3.filter((row1) => {
  const orderID1 = String(row1[transactionColumnIndex3]).trim().replace(/^winzo-|-1$/g, '') || String(row1[transactionColumnalternateIndex3]).trim().replace(/"/g, '').replace(/^winzo-|-1$/g, '');
  
  // Check if the order ID in Data1 is not in orderDataMap (not matched with Data3)
  return !orderDataMap[orderID1];
}):[]


    const data3Headers = data3 ? Object.keys(data3[0]):[]
    const csvFilePath1 = csvFile1.value; // Assuming csvFile2.value contains the file path
    const startIndex = csvFilePath1.lastIndexOf('\\') + 1; // Find the last backslash
    const endIndex = csvFilePath1.lastIndexOf('.'); // Find the last dot
    const fileName1 = csvFilePath1.substring(startIndex, endIndex);
    const csvFilePath2 = csvFile2.value; // Assuming csvFile2.value contains the file path
    const startIndex2 = csvFilePath2.lastIndexOf('\\') + 1; // Find the last backslash
    const endIndex2 = csvFilePath2.lastIndexOf('.'); // Find the last dot
    const fileName2 = csvFilePath2.substring(startIndex2, endIndex2);
        // Reconcile the order statuses and amounts between CF and CFGT
        const reconciledData = [];
  Object.keys(orderDataMap).forEach((orderID) => {
    const { status1, status2, amount1, amount2 } = orderDataMap[orderID];
    const row = { TRANSACTION_ID: orderID };
  
    if (status1 && status2 && status1 === status2) {
      row.reconciliation_reason = 'Matched';
      row.status1 = status1;
      row.status2 = status2;
      row.amount1 = amount1 || '';
      row.amount2 = amount2 || '';
    } else if (status1 && status2) {
      row.reconciliation_reason = 'Status Mismatch';
      row.status1 = status1;
      row.status2 = status2;
      row.amount1 = amount1 || '';
      row.amount2 = amount2 || '';
    } else if (status1) {
      row.reconciliation_reason = `Order ID not found in ${fileName2}`;
      row.status1 = status1;
      row.status2 = '';
      row.amount1 = amount1 || '';
      row.amount2 = '';
    } else {
      row.reconciliation_reason = `Order ID not found in ${fileName1}`;
      row.status1 = '';
      row.status2 = status2;
      row.amount1 = '';
      row.amount2 = amount2 || '';
    }
  
    reconciledData.push(row);
  });
  
  const workbook2 = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reconciliation');
  
  const headingRow = worksheet.addRow(['TRANSACTION_ID', 'Reconciliation Reason', 'Status 1', 'Status 2', 'Amount 1', 'Amount 2']);
  const createCsvWriter = workbook2.addWorksheet('unmatched_data');
  const headingRow2 = createCsvWriter.addRow(data3Headers)
  const rowS = unmatchedRows.map((row) => Object.values(row));
  createCsvWriter.addRows(rowS);
  


  const lastColumnIndex2 = headingRow.cellCount;
  for (let col = 1; col <= lastColumnIndex2; col++) {
    const cell = headingRow.getCell(col);
    // Apply desired formatting to each cell
    cell.alignment = { horizontal: 'center' };
    cell.border = { bottom: { style: 'medium' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
    cell.font = { bold: true };
  
   
  }
   
  
  worksheet.getColumn('E').numFmt = '#,##0.00';
  worksheet.getColumn('F').numFmt = '#,##0.00';
  
  
  worksheet.getColumn('A').width = 35;
  worksheet.getColumn('B').width = 25;
  worksheet.getColumn('C').width = 15;
  worksheet.getColumn('D').width = 15;
  worksheet.getColumn('E').width = 15;
  worksheet.getColumn('F').width = 15;
  
  const rows = reconciledData.map((row) => Object.values(row));
  worksheet.addRows(rows);
  
  // Generate the summary
  const summaryFile1 = Object.create(null);
  const summaryFile2 = Object.create(null);
  
  reconciledData.forEach((row) => {
    const reconciliationReason = row.reconciliation_reason;
    const status1 = row.status1;
    const status2 = row.status2;
    const amount1 = row.amount1 || 0;
    const amount2 = row.amount2 || 0;
  
    // Update summaryFile1
    if (!summaryFile1[reconciliationReason]) {
      summaryFile1[reconciliationReason] = { total: 0 };
    }
  
    if (!summaryFile1[reconciliationReason][status1]) {
      summaryFile1[reconciliationReason][status1] = { count: 0, amount: 0, matchedStatuses: {} };
    }
  
    summaryFile1[reconciliationReason][status1].count++;
    summaryFile1[reconciliationReason][status1].amount += amount1;
    summaryFile1[reconciliationReason].total++;
  
    // Update summaryFile2
    if (!summaryFile2[reconciliationReason]) {
      summaryFile2[reconciliationReason] = { total: 0 };
    }
  
    if (!summaryFile2[reconciliationReason][status2]) {
      summaryFile2[reconciliationReason][status2] = { count: 0, amount: 0, matchedStatuses: {} };
    }
  
    summaryFile2[reconciliationReason][status2].count++;
    summaryFile2[reconciliationReason][status2].amount += amount2;
    summaryFile2[reconciliationReason].total++;
  
    // Track the order IDs and their corresponding statuses in Status Mismatch category
    if (reconciliationReason === 'Status Mismatch') {
      if (status1 && status2) {
        if (!summaryFile1[reconciliationReason][status1].matchedStatuses[status2]) {
          summaryFile1[reconciliationReason][status1].matchedStatuses[status2] = {
            count: 0,
            amount: 0,
          };
        }
        summaryFile1[reconciliationReason][status1].matchedStatuses[status2].count++;
        summaryFile1[reconciliationReason][status1].matchedStatuses[status2].amount += amount1;
  
        if (!summaryFile2[reconciliationReason][status2].matchedStatuses[status1]) {
          summaryFile2[reconciliationReason][status2].matchedStatuses[status1] = {
            count: 0,
            amount: 0,
          };
        }
        summaryFile2[reconciliationReason][status2].matchedStatuses[status1].count++;
        summaryFile2[reconciliationReason][status2].matchedStatuses[status1].amount += amount2;
      }
    }
  });
        
       // Create a summary sheet
       const summarySheet = workbook.addWorksheet('Summary');
  
  const headerRow = summarySheet.addRow(['Reconciliation Reason', 'Status', 'Count', 'Amount', 'Corresponding Status']);
  
  
  
  const lastColumnIndex = headerRow.cellCount;
  for (let col = 1; col <= lastColumnIndex; col++) {
    const cell = headerRow.getCell(col);
    // Apply desired formatting to each cell
    cell.alignment = { horizontal: 'center' };
    cell.border = { bottom: { style: 'medium' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
    cell.font = { bold: true };
  
    // ...
  }
  
     // Apply styles to the summary sheet
     summarySheet.getColumn(1).width = 40;
    summarySheet.getColumn(2).width = 15;
    summarySheet.getColumn(3).width = 10;
    summarySheet.getColumn(4).width = 15;
    summarySheet.getColumn(5).width = 20;
  
  
  // Add styling to the "Summary 1" section
  summarySheet.addRow([]); // Add an empty row before Summary 1
  const summary1StartRow = summarySheet.addRow(['Summary 1']);
  summary1StartRow.getCell(1).font = { bold: true };
  summary1StartRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
  
  
  
  
  
  const subRowStyle = { border: { bottom: { style: 'medium' } } };
  
  Object.keys(summaryFile1).forEach((reconciliationReason) => {
    const row = summarySheet.addRow([reconciliationReason, '', summaryFile1[reconciliationReason].total, '']);
    row.getCell(1).font = { bold: true };
  
    Object.keys(summaryFile1[reconciliationReason]).forEach((status) => {
      if (status !== 'total' && status !== 'matchedStatuses') {
        const count = summaryFile1[reconciliationReason][status]?.count || '';
        const amount = summaryFile1[reconciliationReason][status]?.amount || '';
  
        const subRow = summarySheet.addRow(['', status, count, amount]);
        subRow.border = subRowStyle;
  
        // Check if there are matched statuses for the current status
        const matchedStatuses = summaryFile1[reconciliationReason][status]?.matchedStatuses;
        if (matchedStatuses) {
          Object.keys(matchedStatuses).forEach((matchedStatus) => {
            const matchedCount = matchedStatuses[matchedStatus]?.count || '';
            const matchedAmount = matchedStatuses[matchedStatus]?.amount || '';
  
            const matchedSubRow = summarySheet.addRow(['', '', matchedCount, matchedAmount, matchedStatus]);
            matchedSubRow.border = subRowStyle;
          });
        }
      }
    });
  })
  const summary1EndRow = summarySheet.addRow([]);
  
  const startRow = summary1StartRow.number;
  const startColumn = 1;
  const endRow = summary1EndRow.number;
  const endColumn = 5;
  
  
  
  // Apply dotted border to the inner cells
  for (let row = startRow; row <= endRow; row++) {
    for (let column = startColumn; column <= endColumn; column++) {
      const cell = summarySheet.getCell(row, column);
  
      cell.border = {
        top: { style: 'dotted' },
        left: { style: 'dotted' },
        right: { style: 'dotted' },
        bottom: { style: 'dotted' },
      };
    
      // Apply number format for columns 3 and 4
   if (column === 3 || column === 4) {
        cell.numFmt = '#,##0';
      }
    }
  }
  
  // Apply medium border to the outer range
  for (let row = startRow; row <= endRow; row++) {
    for (let column = startColumn; column <= endColumn; column++) {
      const cell = summarySheet.getCell(row, column);
  
      if (row === startRow) {
        cell.border = {
          top: { style: 'medium' },
          bottom: { style: 'dotted' },
          right: { style: 'dotted' },
          left: { style: 'dotted' }
          
        };
      }
      if (row === endRow) {
        cell.border = {
          top: { style: 'dotted' },
          bottom: { style: 'medium' },
          right: { style: 'dotted' },
          left: { style: 'dotted' }
        };
      }
      if (column === startColumn) {
        cell.border = {
          top: { style: 'dotted' },
          bottom: { style: 'dotted' },
          right: { style: 'dotted' },
          left: { style: 'medium' },
  
        };
      }
      if (column === endColumn) {
        cell.border = {
          top: { style: 'dotted' },
          bottom: { style: 'dotted' },
          right: { style: 'medium' },
          left: { style: 'dotted' }
        };
      }
      if (column === endColumn && row === endRow) {
        cell.border = {
          
          right: { style: 'medium' },
          left: {style:'dotted'},
          top:{style:'dotted'},
          bottom: { style: 'medium' }
        };
      }
      if (column === endColumn && row === startRow) {
        cell.border = {
          
          right: { style: 'medium' },
          left: {style:'dotted'},
          top:{style:'medium'},
          bottom: { style: 'dotted' }
        };
      }
      if (column === startColumn && row === startRow) {
        cell.border = {
          
          right: { style: 'dotted' },
          left: {style:'medium'},
          top:{style:'medium'},
          bottom: { style: 'dotted' }
        };
      }
      if (column === startColumn && row === endRow) {
        cell.border = {
          
          right: { style: 'dotted' },
          left: {style:'medium'},
          top:{style:'dotted'},
          bottom: { style: 'medium' }
        };
      }
    }
  }
  

    // Add styling to the "Summary 2" section
    summarySheet.addRow([]);
  const summary2StartRow = summarySheet.addRow(['Summary 2']);
  summary2StartRow.getCell(1).font = { bold: true };
  summary2StartRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
  
  
    // Populate summarySheet with data from summaryFile2
    Object.keys(summaryFile2).forEach((reconciliationReason) => {
    const row = summarySheet.addRow([reconciliationReason, '', summaryFile2[reconciliationReason].total, '']);
    row.getCell(1).font = { bold: true };
  
    Object.keys(summaryFile2[reconciliationReason]).forEach((status) => {
      if (status !== 'total' && status !== 'matchedStatuses') {3
        const count = summaryFile2[reconciliationReason][status]?.count || '';
        const amount = summaryFile2[reconciliationReason][status]?.amount || '';
  
        const subRow = summarySheet.addRow(['', status, count, amount]);
        subRow.border = subRowStyle;
  
        // Check if there are matched statuses for the current status
        const matchedStatuses = summaryFile2[reconciliationReason][status]?.matchedStatuses;
        if (matchedStatuses) {
          Object.keys(matchedStatuses).forEach((matchedStatus) => {
            const matchedCount = matchedStatuses[matchedStatus]?.count || '';
            const matchedAmount = matchedStatuses[matchedStatus]?.amount || '';
  
            const matchedSubRow = summarySheet.addRow(['', '', matchedCount, matchedAmount, matchedStatus]);
            matchedSubRow.border = subRowStyle;
          });
        }
      }
    });
  })
  
  const summary2EndRow = summarySheet.addRow([]);
  
  const start2Row = summary2StartRow.number;
  const start2Column = 1;
  const endRow2 = summary2EndRow.number;
  const endColumn2 = 5;
  
  for (let row = start2Row; row <= endRow2; row++) {
    for (let column = start2Column; column <= endColumn2; column++) {
      const cell = summarySheet.getCell(row, column);
      cell.border = {
        top: { style: 'dotted' },
        left: { style: 'dotted' },
        right: { style: 'dotted' },
        bottom: { style: 'dotted' },
      }
    }
  }
      // Apply medium border to the outer range
  for (let row = start2Row; row <= endRow2; row++) {
    for (let column = start2Column; column <= endColumn2; column++) {
      const cell = summarySheet.getCell(row, column);
  
      if (row === start2Row) {
        cell.border = {
          top: { style: 'medium' },
          bottom: { style: 'dotted' },
          right: { style: 'dotted' },
          left: { style: 'dotted' }
          
        };
      }
      if (row === endRow2) {
        cell.border = {
          top: { style: 'dotted' },
          bottom: { style: 'medium' },
          right: { style: 'dotted' },
          left: { style: 'dotted' }
        };
      }
      if (column === start2Column) {
        cell.border = {
          top: { style: 'dotted' },
          bottom: { style: 'dotted' },
          right: { style: 'dotted' },
          left: { style: 'medium' },
  
        };
      }
      if (column === endColumn2) {
        cell.border = {
          top: { style: 'dotted' },
          bottom: { style: 'dotted' },
          right: { style: 'medium' },
          left: { style: 'dotted' }
        };
      }
      if (column === endColumn2 && row === endRow2) {
        cell.border = {
          
          right: { style: 'medium' },
          left: {style:'dotted'},
          top:{style:'dotted'},
          bottom: { style: 'medium' }
        };
      }
      if (column === endColumn2 && row === start2Row) {
        cell.border = {
          
          right: { style: 'medium' },
          left: {style:'dotted'},
          top:{style:'medium'},
          bottom: { style: 'dotted' }
        };
      }
      if (column === start2Column && row === start2Row) {
        cell.border = {
          
          right: { style: 'dotted' },
          left: {style:'medium'},
          top:{style:'medium'},
          bottom: { style: 'dotted' }
        };
      }
      if (column === start2Column && row === endRow2) {
        cell.border = {
          
          right: { style: 'dotted' },
          left: {style:'medium'},
          top:{style:'dotted'},
          bottom: { style: 'medium' }
        };
      }
  
      if (column === 3 || column === 4) {
        cell.numFmt = '#,##0';
      }
    }
  }
  
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'ReconciledData.xlsx');
    });
    
    workbook2.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Unmatched_data.xlsx');
    });
  }
