import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { utilService } from '../services/util.service'

import { useDispatch, useSelector } from 'react-redux'

export function ImgMediaCard({toy, onRemoveToy}) {
  const user = useSelector(storeState => storeState.userModule.loggedinUser)
  const transformedLabels = toy.labels.map(label => label.toLowerCase().replace(/\s+/g, '')).join(', ');
  return (
    <section className='card'>

    
    <Card sx={{ marginTop:1, maxWidth: 255, maxHeight:500 }}>
      <CardMedia
        component="img"
        alt="img supposed to be here 🤷🏼‍♂️"
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
        <section className={`card-labels ${transformedLabels}`}>
        
        <span>{toy.labels}</span>
        </section>
        </Typography>
        
       
      </CardContent>
      <section className='card-in-stock' >
          {toy.inStock && 'In stock'}
      </section>
      
      <CardActions>

        {user && user.isAdmin ? <section className='flex align-items'><Button onClick={() => onRemoveToy(toy._id)}>Delete</Button>
        <Link  to={`/toy/edit/${toy._id}`} className="toy-actions"> <Button size="small">Edit</Button></Link></section> : ''}
        


        <Link to={`/toy/${toy._id}`} className="toy-actions"><Button size="small">Learn More</Button></Link>
      </CardActions>
    </Card>
    </section>
  );
}