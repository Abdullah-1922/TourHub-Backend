export function generateInvoiceId() {
    const prefix = "Inv";
    const randomPart = Math.floor(Math.random() * 1000000) 
      .toString() // Convert number to string
      .padStart(6, "0"); // Pad with leading zeros if necessary
  



    
    return `${prefix}-${randomPart}`;
  }