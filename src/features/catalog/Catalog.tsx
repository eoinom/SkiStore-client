import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import LoadingComponent from '../../app/layout/LoadingComponents';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from './catalogSlice';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceAsc', label: 'Price - Low to high' },
  { value: 'priceDesc', label: 'Price - High to low' },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    status,
    productParams,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (status.includes('pending'))
    return <LoadingComponent message='Loading products...' />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={productParams.orderBy}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>
        {brands && brands.length > 0 ? (
          <Paper sx={{ mb: 2, p: 2 }}>
            <FormGroup>
              {brands.map((brand: any) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={brand}
                  key={brand}
                />
              ))}
            </FormGroup>
          </Paper>
        ) : (
          ''
        )}
        {types && types.length > 0 ? (
          <Paper sx={{ mb: 2, p: 2 }}>
            <FormGroup>
              {types.map((type: any) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={type}
                  key={type}
                />
              ))}
            </FormGroup>
          </Paper>
        ) : (
          ''
        )}
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>Displaying 1-6 of 20 items</Typography>
          <Pagination color='secondary' size='large' count={10} page={2} />
        </Box>
      </Grid>
    </Grid>
  );
}
