import React from 'react'
import AllDrawer from '../../components/food-menu/Drawer'
import Button from '../../components/Button'
import { useAllOrder } from '../react-query/order'

function OrderList() {
const allOrder = useAllOrder()
if(allOrder){
  // return window.location.reload()
}

  return (
    <div style={{marginLeft:"500px"}}>
      {allOrder && allOrder?.length !== 0 ?
      <table
        border={1}
        style={{
          borderCollapse: "collapse",
          border:'1px solid #ccc'
        }}
      >
        <thead style={{backgroundColor:'#eee'}}>
          <tr>
            <th style={{ padding: "8px" }}>S.N</th>
            <th style={{ padding: "8px" }}>Table Number</th>
          
            <th style={{ padding: "8px" }}>Payment Type</th>
            <th style={{ padding: "8px" }}>Order Status</th>
            <th style={{ padding: "8px" }}>Quantity</th>
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allOrder?.map((d, index) => (
              <tr key={index}>
                 <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{d?.table_number}</td>
                <td style={{ padding: "8px" }}>{d?.payment?.type}</td>
                <td style={{ padding: "8px" }}>{d?.payment?.status}</td>
                <td style={{ padding: "8px" }}>{d?.quantity}</td>
                <td
                  style={{
                    padding: "8px",
                  }}
                >
                  <div style={{display:"flex", justifyContent:"space-evenly"}}>
                
                  {/* <Button type="edit"  />
                  <Button type="delete"  /> */}
                  </div>
                </td>
              </tr>
           ))}
        </tbody>
      </table>
      :<p>No Orders Found</p>}
    </div>
  )
}

export default OrderList
