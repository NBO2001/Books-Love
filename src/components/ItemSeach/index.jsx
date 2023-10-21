import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const ItemSeach = ({item, onClick, children}) => {

    const maxDescriptionLength = 150;

    const truncatedDescription = item && item.describe ? (
        item.describe.length > maxDescriptionLength
        ? item.describe.substring(0, maxDescriptionLength) + "..."
        : item.describe
    ) : "error";


    return(
        <Card sx={{ display: 'flex', mb:1 }} onClick={onClick}>
            {item ? (<CardMedia
                component="img"
                sx={{ maxWidth: 120 }}
                image={item.src}
                alt="Book img"
            />): (<Skeleton variant="rectangular" width={120} height={118} />)}

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    {item ? (
                        <Typography component="div" variant="h5" sx={{ overflow: 'hidden', textOverflow: 'ellipsis',maxHeight: "35px", width: "100%" }}>
                            {item.title ? item.title : "error"}
                        </Typography>
                    ) : (
                        <Skeleton variant="rectangular" width={210} height={20} />
                    )}

                    {item ? (<Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1.5 }} component="div">
                        by {item.author ? item.author : "error"}
                    </Typography>): (<Skeleton variant="rectangular" width={210} height={15} />)}

                    {item ? (<Typography variant="body2"  component="div">
                        {truncatedDescription}
                    </Typography>): (<Skeleton variant="rectangular" width={210} height={60} />)}

                </CardContent>
                {children}
            </Box>
            
        </Card>


    )
};

export default ItemSeach;