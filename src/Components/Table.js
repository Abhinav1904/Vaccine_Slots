import axios from "axios";
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";

function Table(props) {
    const [vaccineName, setvaccineNanme] = useState("");
    const [tableData, setTableData] = useState([]);
    const [search, setsearch] = useState("")
    const [filteredTableData, setFilterData] = useState(tableData)
    const getTableData = async () => {
        try {
            const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=363&date=${props.date}`);
            setTableData(response.data.centers);
            setFilterData(response.data.centers)

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {

        setFilterData(tableData.filter((e) => {
            console.log(e.sessions[0].vaccine) 
            return e.sessions[0].vaccine.includes(search.toUpperCase())
        }))
    }, [search])
    let index = 0
    const columns = [
        {
            name: "No",
            width: 10,
            cell: (row) => {
                index = index + 0.5
                return index
            },
            width: "100px"
        },
        {
            name: "Name",
            selector: (row) => row.name,
            width: "350px"
        },
        {
            name: "Vaccine",
            selector: (row) => row.sessions[0].vaccine
        },
        {
            name: "Available Capacity",
            selector: (row) => row.sessions[0].available_capacity
        },
        {
            name: "Slots",
            selector: (row) => row.sessions[0].slots.map((el) => {
                { return <div className="my-3">{el.time}</div> }
            })
        }
    ]
    useEffect(() => {
        getTableData();
    }, [props.date]);

    return <DataTable columns={columns} data={filteredTableData} highlightOnHover subHeader subHeaderComponent={<input style={{"textAlign":"center"}} type="text" placeholder="Search Vaccine Name" className="w-25 form-control" onChange={(e) => { setsearch(e.target.value) }} />} />
}

export default Table