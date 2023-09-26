import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { utilService } from '../services/util.service'



export function ImgMediaCard({toy, onRemoveToy}) {
  const colors = ['red','green','blue','purple','yellowlight','lightblue']
  const currColIdx = utilService.getRandomIntInclusive(0, colors.length-1)
  return (
    <section className='card'>

    
    <Card sx={{ marginTop:1, maxWidth: 255, maxHeight:500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={toy.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {toy.name}
        
        </Typography>
        <Typography variant="body3" color="text.secondary">
            
            </Typography>
        <Typography variant="body2" color="text.secondary">
         
        <strong>Price: ${toy.price} </strong><br/>
        <section className='card-labels' style={ { backgroundColor: colors[currColIdx] } }>
        
        <span>{toy.labels}</span>
        </section>
        </Typography>
        
       
      </CardContent>
      <section className='card-in-stock' >
          {toy.inStock && 'In stock'}
      </section>
      
      <CardActions>
        <Button onClick={() => onRemoveToy(toy._id)}>Delete</Button>
        <Link  to={`/toy/edit/${toy._id}`} className="toy-actions"> <Button size="small">Edit</Button></Link>
        <Link to={`/toy/${toy._id}`} className="toy-actions"><Button size="small">Learn More</Button></Link>
      </CardActions>
    </Card>
    </section>
  );
}