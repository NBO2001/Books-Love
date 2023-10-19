import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ItemList = ({linkImg, listName, qtnLivos, describe, onClick, value}) => {

    return (
        <Card value={value} onClick={onClick} sx={{ display: 'flex', mb:1 }}>
            <CardMedia
                component="img"
                sx={{ maxWidth: 120 }}
                image={linkImg}
                alt="Book img"
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {listName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1.5 }} component="div">
                        {qtnLivos} Livros
                    </Typography>
                    
                    <Typography variant="body2"  component="div">
                        {describe}
                    </Typography>

                </CardContent>
            </Box>

        </Card>
      );

};

export default ItemList;