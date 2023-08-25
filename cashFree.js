
function populateColumnOptions(headers, transactionColumnSelect, statusColumnSelect, amountColumnSelect) {
    transactionColumnSelect.innerHTML = '';
    statusColumnSelect.innerHTML = '';
    amountColumnSelect.innerHTML = '';
    // filterColumnSelect.innerHTML = '';
  
    headers.forEach((header, index) => {
      const transactionOption = document.createElement('option');
      const statusOption = document.createElement('option');
      const amountOption = document.createElement('option');
      // const filterOption = document.createElement('option');
      
      transactionOption.value = header; // Use header value instead of index
      transactionOption.text = header;
      statusOption.value = header; // Use header value instead of index
      statusOption.text = header;
      amountOption.value = header; // Use header value instead of index
      amountOption.text = header;
      // filterOption.value = header; // Use header value instead of index
      // filterOption.text = header;
  
      transactionColumnSelect.appendChild(transactionOption);
      statusColumnSelect.appendChild(statusOption);
      amountColumnSelect.appendChild(amountOption);
      // filterColumnSelect.appendChild(filterOption);
    });
  }
  
  // function populateFilterOptions(contents, filterSelect, heading) {
  //   const rows = contents.split('\n');
  //   const headers = rows[0].split(',');

  //   const headingIndex = headers.findIndex((header) => header === heading);
  //   if (headingIndex === -1) {
  //     return;
  //   }

  //   const uniqueValues = [...new Set(rows.slice(1).map((row) => row.split(',')[headingIndex]))];

  //   filterSelect.innerHTML = '';

  //   for (let j = 0; j < uniqueValues.length; j++) {
  //     const option = document.createElement('option');
  //     option.value = uniqueValues[j];
  //     option.textContent = uniqueValues[j];
  //     filterSelect.appendChild(option);
  //   }
  // }

  
  function handleFileSelection(event, fileNumber) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target.result;
      const data = parseCSV(contents);
      const headers = Object.keys(data[0]);
  
      if (fileNumber === 1) {
        transactionColumnSelect1 = document.getElementById('transactionColumn1');
        statusColumnSelect1 = document.getElementById('statusColumn1');
        amountColumnSelect1 = document.getElementById('amountColumn1');
        // filterHeadingSelect1 = document.getElementById('filterHeading1');
        // filterSelect1 = document.getElementById('filterSelect1');
        populateColumnOptions(headers, transactionColumnSelect1, statusColumnSelect1, amountColumnSelect1);
      } else if (fileNumber === 2) {
        transactionColumnSelect2 = document.getElementById('transactionColumn2');
        statusColumnSelect2 = document.getElementById('statusColumn2');
        amountColumnSelect2 = document.getElementById('amountColumn2');
        // filterHeadingSelect2 = document.getElementById('filterHeading2');
        // filterSelect2 = document.getElementById('filterSelect2');
        populateColumnOptions(headers, transactionColumnSelect2, statusColumnSelect2, amountColumnSelect2);
      }
    };
    // if (filterHeadingSelect1.value) {
    //   populateFilterOptions(contents, filterSelect1, filterHeadingSelect1.value);
    // }

    // if (filterHeadingSelect2.value) {
    //   populateFilterOptions(contents, filterSelect2, filterHeadingSelect2.value);
    // }
    reader.readAsText(file);
  }
  
  
  document.addEventListener('DOMContentLoaded', function () {
    transactionColumnSelect1 = document.getElementById('transactionColumn1');
    statusColumnSelect1 = document.getElementById('statusColumn1');
    amountColumnSelect1 = document.getElementById('amountColumn1');
    // filterHeadingSelect1 = document.getElementById('filterHeading1');
    transactionColumnSelect2 = document.getElementById('transactionColumn2');
    statusColumnSelect2 = document.getElementById('statusColumn2');
    amountColumnSelect2 = document.getElementById('amountColumn2');
    // filterHeadingSelect2 = document.getElementById('filterHeading2');
    
    const csvFile1 = document.getElementById('csvFile1');
    const csvFile2 = document.getElementById('csvFile2');
  
    csvFile1.addEventListener('change', function (event) {
      handleFileSelection(event, 1);
    });
    csvFile2.addEventListener('change', function (event) {
      handleFileSelection(event, 2);
    });
  });
  

  // function filterData(data, filterHeadingIndex, filterValue, transactionColumnIndex) {
  //   if (!filterHeadingIndex || !filterValue) {
  //     return data;
  //   }
  
  //   return data.filter((row) => {
  //     const transactionID = row[transactionColumnIndex] ? String(row[transactionColumnIndex]).trim() : '';
  //     const headingValue = row[filterHeadingIndex] ? String(row[filterHeadingIndex]).trim() : '';
  
  //     return transactionID === filterValue && headingValue !== '';
  //   });
  // }
  
  
        function processFiles() {
          const csvFile1 = document.getElementById('csvFile1').files[0];
          const csvFile2 = document.getElementById('csvFile2').files[0];
  
          const transactionColumnIndex1 = transactionColumnSelect1.value;
    const statusColumnIndex1 = statusColumnSelect1.value;
    const amountColumnIndex1 = amountColumnSelect1.value;
    // const filterHeadingIndex1 = filterHeadingSelect1.value;
    // const filterValue1 = filterSelect1.value;
    const transactionColumnIndex2 = transactionColumnSelect2.value;
    const statusColumnIndex2 = statusColumnSelect2.value;
    const amountColumnIndex2 = amountColumnSelect2.value;
    // const filterHeadingIndex2 = filterHeadingSelect2.value;
    // const filterValue2 = filterSelect2.value;
  
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
        
        const headers1 = Object.keys(data1[0]);
        const headers2 = Object.keys(data2[0]);
  
        populateColumnOptions(headers1, transactionColumnSelect1, statusColumnSelect1, amountColumnSelect1);
        populateColumnOptions(headers2, transactionColumnSelect2, statusColumnSelect2, amountColumnSelect2);
  
        // Process the data after reading both CSV files
        processData(data1, data2, transactionColumnIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, statusColumnIndex2, amountColumnIndex2);
      };
      reader2.readAsText(csvFile2);
    };
    reader1.readAsText(csvFile1);
  }
  
  function parseCSV(csvContent) {
    const rows = csvContent.split('\n');
    const data = [];
    const headers = rows[0].split(',');
  
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      if (row.length === headers.length) {
        const rowData = {};
        for (let j = 0; j < headers.length; j++) {
          rowData[headers[j]] = row[j];
        }
        data.push(rowData);
      }
    }
  
    return data;
  }
  
  
  function processData(data1, data2, transactionColumnIndex1, statusColumnIndex1, amountColumnIndex1, transactionColumnIndex2, statusColumnIndex2, amountColumnIndex2) {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
        // Create a map of order IDs to statuses and amounts from both CSV files
        const orderDataMap = {};
  
        data1.forEach((row) => {
      if (row[statusColumnIndex1] === "Failure") {
        row[statusColumnIndex1] = "FAILED";
      }
    });
  
    data2.forEach((row) => {
      if (row[statusColumnIndex2] === "Failure") {
        row[statusColumnIndex2] = "FAILED";
      }
    });
  
    data1.forEach((row) => {
      const orderID = String(row[transactionColumnIndex1]).trim();
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
  
    data2.forEach((row) => {
      const orderID = String(row[transactionColumnIndex2]).trim();
      const amount = typeof row[amountColumnIndex2] === 'number'
        ? row[amountColumnIndex2]
        : row[amountColumnIndex2]
          ? parseFloat(row[amountColumnIndex2].replace(/,/g, ''))
          : 0;
      if (!orderDataMap[orderID]) {
        orderDataMap[orderID] = { status1: null, status2: row[statusColumnIndex2], amount1: null, amount2: amount };
      } else {
        orderDataMap[orderID].status2 = row[statusColumnIndex2];
        orderDataMap[orderID].amount2 += amount;
      }
    });
  
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
      row.reconciliation_reason = 'Order ID not found in CFGT';
      row.status1 = status1;
      row.status2 = '';
      row.amount1 = amount1 || '';
      row.amount2 = '';
    } else {
      row.reconciliation_reason = 'Order ID not found in CF';
      row.status1 = '';
      row.status2 = status2;
      row.amount1 = '';
      row.amount2 = amount2 || '';
    }
  
    reconciledData.push(row);
  });
  
 
  const worksheet = workbook.addWorksheet('Reconciliation');
  
  const headingRow = worksheet.addRow(['TRANSACTION_ID', 'Reconciliation Reason', 'Status 1', 'Status 2', 'Amount 1', 'Amount 2']);
  
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
  // headerRow.font = { bold: true };
  // headerRow.alignment = { horizontal: 'center' };
  // headerRow.border = { bottom: { style: 'medium' } };
  
  
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
  }   
