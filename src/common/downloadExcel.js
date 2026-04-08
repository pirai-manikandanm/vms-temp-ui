import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const downloadTemplate = (file_name, isThirdParty) => {

        const data = isThirdParty ? [
                {
                        "First Name": "",
                        "Last Name": "",
                        "Mobile Number": "",
                        "Email Address": "",
                        "Voucher Amount": ""

                },
        ] : [
                {

                        "Mobile Number": "",
                        "Voucher Link": "",
                        "Voucher Amount": "",
                        "Voucher Name": "",
                        "Expiration Date": ""
                },
        ];


        const worksheet = XLSX.utils.json_to_sheet(data);


        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");


        const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
        });


        const blob = new Blob([excelBuffer], {
                type: "application/octet-stream",
        });

        saveAs(blob, `${file_name}.xlsx`);
};

export default downloadTemplate;

