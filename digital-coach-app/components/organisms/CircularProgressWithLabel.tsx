import { Box, CircularProgress, Typography } from '@mui/material';
function CircularProgressWithLabel(props: any) {
	return (
	  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
		<CircularProgress variant="determinate" {...props} size={64}/>
		<Box
		  sx={{
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			position: 'absolute',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		  }}
		>
		  <Typography variant="caption" component="div" color="text.secondary" sx={{fontSize: 18}}>
			{`${Math.round(props.value)}%`}
		  </Typography>
		</Box>
	  </Box>
	);
  }

  export default CircularProgressWithLabel;