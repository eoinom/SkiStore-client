import {
  AppBar,
  FormControlLabel,
  Grid,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6'>SKI-STORE</Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleThemeChange} />}
            label='Switch Theme'
            labelPlacement='start'
          />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
