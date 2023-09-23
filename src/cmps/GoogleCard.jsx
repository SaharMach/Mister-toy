import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


export function ImgMediaCard({toy, onRemoveToy}) {

  return (
    <Card sx={{ marginTop:1, maxWidth: 255, maxHeight:500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image={toy.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {toy.name}
        
        </Typography>
        <Typography variant="body3" color="text.secondary">
            
            </Typography>
        <Typography variant="body2" color="text.secondary">

          Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Molestiae eos eligendi qui dolore cum aperiam minus. Dolores quo distinctio ratione?<br/>
           <strong>Price: ${toy.price} </strong>
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button onClick={() => onRemoveToy(toy._id)}>Delete</Button>
        <Link  to={`/toy/edit/${toy._id}`} className="toy-actions"> <Button size="small">Edit</Button></Link>
        <Link to={`/toy/${toy._id}`} className="toy-actions"><Button size="small">Learn More</Button></Link>
      </CardActions>
    </Card>
  );
}