import React from 'react';
import { styled } from '@mui/system';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const StyledCard = styled(Card)({
  maxWidth: '35vw',
  margin: 'auto',
  marginTop: '2rem',
});

const StyledMedia = styled(CardMedia)({
  height: '35vh',
});

export const Photo=(props) => {
  return (
    <StyledCard>
      <StyledMedia image={`data:image/jpeg;base64,${props.photoData}`} title={props.photoDescription} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.photoDescription}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

