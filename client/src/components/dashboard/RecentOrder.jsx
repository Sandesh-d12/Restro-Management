import * as React from "react";
import { useAllOrder } from "../../features/react-query/order";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";

const OrderCard = ({tableNumber, paymentDetails, products, totalCost}) => {
const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/order`)
  }
  return  (
    <Card sx={{ maxWidth: 345, width: '100%', border: '1px solid #ddd', boxShadow: 3, padding:'16px' }} onClick={handleClick}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/order.jpg"
        alt="Order Image"
        style={{borderRadius:'4px'}}
      />
      <CardContent>
        <Box>
        <Typography gutterBottom variant="body2" component="div">
          Table {tableNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Payment Type: {paymentDetails?.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Payment Status: {paymentDetails?.status}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
          Total Cost: ${totalCost}
        </Typography>
        </Box>
        <Box>
        <Typography variant="h6" component="div">
          Products
        </Typography>
        <Box
          component="div"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            whiteSpace: 'normal',
            textOverflow: 'ellipsis',
          }}
        >
          {products && products?.map((product, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {product.name} (x{product.quantity}) - {product.category}
            </Typography>
          ))}
          </Box>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
  );
};

function RecentOrder() {
  const allOrder = useAllOrder();

  const recentOrder = allOrder && [...allOrder].reverse().slice(0, 4);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{fontSize:'28px', lineHeight:'normal', fontWeight:500, marginBottom:'8px'}}>Latest Orders</span>
      <a href="/order" style={{ textDecoration:'none'}}><span color="blue">Take a look at all orders</span></a>.
      <div style={{ display: 'flex', gap:'20px' }}>
        {recentOrder && recentOrder?.map((item, index) => (
          <OrderCard
            key={index}
            tableNumber={item?.table_number}
            paymentDetails={item?.paymentDetails} 
            products={item.product}
            totalCost={item.total_cost}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentOrder
