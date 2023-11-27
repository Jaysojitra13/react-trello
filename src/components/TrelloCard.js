import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const TrelloCard = ({ text }) => {
  return (
    <Card sx={{ minWidth: 275 }} style={style.cardContainer}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
};

const style = {
  cardContainer: {
    marginBottom: 8
  }
}

export default TrelloCard;
