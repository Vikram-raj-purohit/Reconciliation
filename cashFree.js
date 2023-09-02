

function populateColumnOptions(headers, transactionColumnSelect, transactionColumnSelectalternate, statusColumnSelect, amountColumnSelect) {
    transactionColumnSelect.innerHTML = '';
    transactionColumnSelectalternate.innerHTML = '';
    statusColumnSelect.innerHTML = '';
    amountColumnSelect.innerHTML = '';
   
  
    headers.forEach((header, index) => {
      const transactionOption = document.createElement('option');
      const transactionOptionalternate = document.createElement('option');
      const statusOption = document.createElement('option');
      const amountOption = document.createElement('option');
     
      
      transactionOption.value = header; // Use header value instead of index
      transactionOption.text = header;
      transactionOptionalternate.value = header; // Use header value instead of index
      transactionOptionalternate.text = header;
      statusOption.value = header; // Use header value instead of index
      statusOption.text = header;
      amountOption.value = header; // Use header value instead of index
      amountOption.text = header;
     

      transactionColumnSelect.appendChild(transactionOption);
      transactionColumnSelectalternate.appendChild(transactionOptionalternate);
      statusColumnSelect.appendChild(statusOption);
      amountColumnSelect.appendChild(amountOption);
      
    });
  }
  
  
  function handleFileSelection(event, fileNumber) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target.result;
      const data = parseCSV(contents);
      const headers = Object.keys(data[0]);
      console.log(headers)
  
      if (fileNumber === 1) {
        transactionColumnSelect1 = document.getElementById('transactionColumn1');
        transactionColumnAlternate1 = document.getElementById('transactionColumnalternate1');
        statusColumnSelect1 = document.getElementById('statusColumn1');
        amountColumnSelect1 = document.getElementById('amountColumn1');
       
        populateColumnOptions(headers, transactionColumnSelect1, transactionColumnAlternate1, statusColumnSelect1, amountColumnSelect1);
      } else if (fileNumber === 2) {
        transactionColumnSelect2 = document.getElementById('transactionColumn2');
        transactionColumnalternate2 = document.getElementById('transactionColumnalternate2');
        statusColumnSelect2 = document.getElementById('statusColumn2');
        amountColumnSelect2 = document.getElementById('amountColumn2');
       
        populateColumnOptions(headers, transactionColumnSelect2, transactionColumnalternate2, statusColumnSelect2, amountColumnSelect2);
      }
      else if (fileNumber === 3) {
        transactionColumnSelect3 = document.getElementById('transactionColumn3');
        transactionColumnalternate3 = document.getElementById('transactionColumnalternate3');
        statusColumnSelect3 = document.getElementById('statusColumn3');
        amountColumnSelect3 = document.getElementById('amountColumn3');
       
        populateColumnOptions(headers, transactionColumnSelect3, transactionColumnalternate3, statusColumnSelect3, amountColumnSelect3);
      }
      else if (fileNumber === 4) {
        transactionColumnSelect4 = document.getElementById('transactionColumn4');
        transactionColumnalternate4 = document.getElementById('transactionColumnalternate4');
        statusColumnSelect4 = document.getElementById('statusColumn4');
        amountColumnSelect4 = document.getElementById('amountColumn4');
       
        populateColumnOptions(headers, transactionColumnSelect4, transactionColumnalternate4, statusColumnSelect4, amountColumnSelect4);
      }
    };
    
    reader.readAsText(file);
  }
 

  
  document.addEventListener('DOMContentLoaded', function () {
    transactionColumnSelect1 = document.getElementById('transactionColumn1');
    transactionColumnalternate1 = document.getElementById('transactionColumnalternate1');
    statusColumnSelect1 = document.getElementById('statusColumn1');
    amountColumnSelect1 = document.getElementById('amountColumn1');
   
    transactionColumnSelect2 = document.getElementById('transactionColumn2');
    transactionColumnalternate2 = document.getElementById('transactionColumnalternate2');
    statusColumnSelect2 = document.getElementById('statusColumn2');
    amountColumnSelect2 = document.getElementById('amountColumn2');

    transactionColumnSelect3 = document.getElementById('transactionColumn3');
    transactionColumnalternate3 = document.getElementById('transactionColumnalternate3');
    statusColumnSelect3 = document.getElementById('statusColumn3');
    amountColumnSelect3 = document.getElementById('amountColumn3');

    transactionColumnSelect4 = document.getElementById('transactionColumn4');
    transactionColumnalternate4 = document.getElementById('transactionColumnalternate4');
    statusColumnSelect4 = document.getElementById('statusColumn4');
    amountColumnSelect4 = document.getElementById('amountColumn4');
    
    
    const csvFile1 = document.getElementById('csvFile1');
    const csvFile2 = document.getElementById('csvFile2');
    const csvFile3 = document.getElementById('csvFile3');
    const csvFile4 = document.getElementById('csvFile4');
    
  
    csvFile1.addEventListener('change', function (event) {
      handleFileSelection(event, 1);
    });
    csvFile2.addEventListener('change', function (event) {
      handleFileSelection(event, 2);
    });
    csvFile3.addEventListener('change', function (event) {
      handleFileSelection(event, 3);
    });
    csvFile4.addEventListener('change', function (event) {
      handleFileSelection(event, 4);
    });
    
  });
  

  
        function processFiles() {
          const csvFile1 = document.getElementById('csvFile1').files[0];
          const csvFile2 = document.getElementById('csvFile2').files[0];
          const csvFile3 = document.getElementById('csvFile3').files[0];
  
          const transactionColumnIndex1 = transactionColumnSelect1.value;
          const transactionColumnalternateIndex1 = transactionColumnalternate1.value;
    const statusColumnIndex1 = statusColumnSelect1.value;
    const amountColumnIndex1 = amountColumnSelect1.value;
    
    const transactionColumnIndex2 = transactionColumnSelect2.value;
    const transactionColumnalternateIndex2 = transactionColumnalternate2.value;
    const statusColumnIndex2 = statusColumnSelect2.value;
    const amountColumnIndex2 = amountColumnSelect2.value;
   
    const transactionColumnIndex3 = transactionColumnSelect3.value;
    const transactionColumnalternateIndex3 = transactionColumnalternate3.value;
    const statusColumnIndex3 = statusColumnSelect3.value;
    const amountColumnIndex3 = amountColumnSelect3.value;
   
  
    if (!transactionColumnIndex1 || !statusColumnIndex1 || !amountColumnIndex1 || !transactionColumnIndex2 || !statusColumnIndex2 || !amountColumnIndex2  ) {
      alert('Please select valid transaction, amount and status columns for both CSV files.');
      return;
    }
          
          const reader1 = new FileReader();
    reader1.onload = function (e) {
      const contents1 = e.target.result;
      const data1 = parseCSV(contents1);
     
  
      const reader2 = new FileReader();
      reader2.onload = function (e) {
        const contents2 = e.target.result;
        const data2 = parseCSV(contents2);
        if (csvFile3) {   
      const reader3 = new FileReader();
      reader3.onload = function (e) {
        const contents3 = e.target.result;
        const data3 = parseCSV(contents3);
        
        const headers1 = Object.keys(data1[0]);
        const headers2 = Object.keys(data2[0]);
        const headers3 = Object.keys(data3[0]);
  
        populateColumnOptions(headers1, transactionColumnSelect1, transactionColumnalternate1, statusColumnSelect1, amountColumnSelect1);
        populateColumnOptions(headers2, transactionColumnSelect2, transactionColumnalternate2, statusColumnSelect2, amountColumnSelect2);
        populateColumnOptions(headers3, transactionColumnSelect3, transactionColumnalternate3, statusColumnSelect3, amountColumnSelect3);
  
        // Process the data after reading both CSV files
        processData(data1, data2, data3, transactionColumnIndex1, transactionColumnalternateIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, transactionColumnalternateIndex2, statusColumnIndex2, amountColumnIndex2, transactionColumnIndex3, transactionColumnalternateIndex3, statusColumnIndex3, amountColumnIndex3,);
     
     
      };
      reader3.readAsText(csvFile3);;
      }
        else {
          // Process the data without data3
          processData(data1, data2, null, transactionColumnIndex1, transactionColumnalternateIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, transactionColumnalternateIndex2, statusColumnIndex2, amountColumnIndex2, null, null, null, null);
        }
      }
      reader2.readAsText(csvFile2);;
    };
    reader1.readAsText(csvFile1);;
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
  
  
  
 async function processData(data1, data2, data3, transactionColumnIndex1, transactionColumnalternateIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, transactionColumnalternateIndex2, statusColumnIndex2, amountColumnIndex2, transactionColumnIndex3, transactionColumnalternateIndex3, statusColumnIndex3, amountColumnIndex3,) {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
   

    const matchedOrderIDs = new Set();

    // Identify matched order IDs from data2
    data2.forEach((row) => {
      const orderID = String(row[transactionColumnIndex2]).trim().replace(/^winzo-|-1$/g, '').replace(/'/g, '').replace(/"/g, '');
      matchedOrderIDs.add(orderID);
    });
    
    // Filter data3 to include only matched order IDs
    const matchedData3 = await data3 ? data3.filter((row) => {
      const orderID = String(row[transactionColumnIndex3]).trim().replace(/'/g, '').replace(/"/g, '').replace(/^winzo-|-1$/g, '');
      return matchedOrderIDs.has(orderID);
    }):[]
        // Create a map of order IDs to statuses and amounts from both CSV files
        const orderDataMap = {};
  
        data1.forEach((row) => {
          const orderID = String(row[transactionColumnIndex1]).trim().replace(/'/g, '').replace(/"/g, '').replace(/^winzo-|-1$/g, ''); 
          
          const status = String(row[statusColumnIndex1]).replace(/[\r]/g, '').trim();
         
     
          if (row[statusColumnIndex1] === "Failure") {
        row[statusColumnIndex1] = "FAILED";
      }
          if (row[statusColumnIndex1] === "captured") {
        row[statusColumnIndex1] = "SUCCESS";
      }
          if (row[statusColumnIndex1] === "created") {
        row[statusColumnIndex1] = "PENDING";
      }
          if (row[statusColumnIndex1] === "FAILURE") {
        row[statusColumnIndex1] = "FAILED";
      }
      if (row[statusColumnIndex1] === "failed") {
        row[statusColumnIndex1] = "FAILED";
      }

      if (row[statusColumnIndex1] === "reversed") {
        row[statusColumnIndex1] = "FAILED";
      }
      if (row[statusColumnIndex1] === "processed") {
        row[statusColumnIndex1] = "SUCCESS";
      }
      if (row[statusColumnIndex1] === "processing") {
        row[statusColumnIndex1] = "PENDING";
      }
    });
  
    data2.forEach((row) => {
      const orderID = String(row[transactionColumnIndex2]).trim().replace(/"/g, '').replace(/'/g, '').replace(/^winzo-|-1$/g, '');
      
          const status = String(row[statusColumnIndex2]).trim().replace(/[\r]/g, '');
         
     
      if (row[statusColumnIndex2] === "Failure") {
        row[statusColumnIndex2] = "FAILED";
      }
      if (row[statusColumnIndex2] === "captured") {
        row[statusColumnIndex2] = "SUCCESS";
      }
          if (row[statusColumnIndex2] === "created") {
        row[statusColumnIndex2] = "PENDING";
      }
      if (row[statusColumnIndex2] === "FAILURE") {
        row[statusColumnIndex2] = "FAILED";
      }
      if (row[statusColumnIndex2] === "failed") {
        row[statusColumnIndex2] = "FAILED";
      }

      if (row[statusColumnIndex2] === "reversed") {
        row[statusColumnIndex2] = "FAILED";
      }
      if (row[statusColumnIndex2] === "processed") {
        row[statusColumnIndex2] = "SUCCESS";
      }
      if (row[statusColumnIndex2] === "processing") {
        row[statusColumnIndex2] = "PENDING";
      }
    });

   

    matchedData3.forEach((row) => {
      const orderID = String(row[transactionColumnIndex3]).trim().replace(/"/g, '').replace(/'/g, '').replace(/^winzo-|-1$/g, '');;
      const status1 = String(row[statusColumnIndex3]).trim();
      const amount1 = typeof row[amountColumnIndex3] === 'number'
        ? row[amountColumnIndex3]
        : row[amountColumnIndex3]
          ? parseFloat(row[amountColumnIndex3].replace(/,/g, ''))
          : 0;
    
      orderDataMap[orderID] = { status1, amount1 };
    });

    
   // Append matched data from data3 to data1
const appendedRows = await data1.map((row) => {
  const orderID = String(row[transactionColumnIndex1]).trim().replace(/^winzo-|-1$/g, '') || String(row[transactionColumnalternateIndex1]).trim().replace(/"/g, '').replace(/^winzo-|-1$/g, '');
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
      const orderID = String(row[transactionColumnIndex1]).trim().replace(/^winzo-|-1$/g, '') || String(row[transactionColumnalternateIndex1]).trim().replace(/"/g, '').replace(/^winzo-|-1$/g, '');
      const amount = typeof row[amountColumnIndex1] === 'number'
        ? row[amountColumnIndex1]
        : row[amountColumnIndex1]
          ? parseFloat(row[amountColumnIndex1].replace(/,/g, ''))
          : 0;
      if (!orderDataMap[orderID]) {
        orderDataMap[orderID] = { status1: row[statusColumnIndex1], status2: null, amount1: amount, amount2: null };
      } else {
        orderDataMap[orderID].amount1 += amount;
      }
    });

    const transactionStatusMap = {}; // To keep track of transaction statuses

data2.forEach((row) => {
  const orderID = String(row[transactionColumnIndex2]).trim().replace(/^winzo-|-1$/g, '') || String(row[transactionColumnalternateIndex2]).trim().replace(/"/g, '').replace(/^winzo-|-1$/g, '');
  const status = String(row[statusColumnIndex2]).trim().replace(/[\r]/g, '');

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
});
  
    data2.forEach((row) => {
      const orderID = String(row[transactionColumnIndex2]).trim().replace(/^winzo-|-1$/g, '')  || String(row[transactionColumnalternateIndex2]).trim().replace(/"/g, '').replace(/^winzo-|-1$/g, '');
      // const status = String(row[statusColumnIndex2]).trim().replace(/[\r]/g, '');
      const status = transactionStatusMap[orderID].trim().replace(/[\r]/g, '');

      const amount = typeof row[amountColumnIndex2] === 'number'
        ? row[amountColumnIndex2]
        : row[amountColumnIndex2]
          ? parseFloat(row[amountColumnIndex2].replace(/,/g, ''))
          : 0;
          // console.log(orderID , amount)
      if (!orderDataMap[orderID]) {
        orderDataMap[orderID] = { status1: null, status2: status, amount1: null, amount2: amount };
      } else {
        orderDataMap[orderID].status2 = status;
        orderDataMap[orderID].amount2 = amount;
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
