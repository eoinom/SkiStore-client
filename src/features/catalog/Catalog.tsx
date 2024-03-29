import { Grid, Paper } from '@mui/material';
import AppPagination from '../../app/components/AppPagination';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import LoadingComponent from '../../app/layout/LoadingComponents';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setPageNumber, setProductParams } from './catalogSlice';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import useProducts from '../../app/hooks/useProducts';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceAsc', label: 'Price - Low to high' },
  { value: 'priceDesc', label: 'Price - High to low' },
];

export default function Catalog() {
  const { products, brands, types, filtersLoaded, metaData } = useProducts();
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <LoadingComponent message='Loading products...' />;

  return (
    <Grid container rowSpacing={1} columnSpacing={4} pb={4}>
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
            <CheckboxButtons
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ brands: items }))
              }
            />
          </Paper>
        ) : (
          ''
        )}
        {types && types.length > 0 ? (
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckboxButtons
              items={types}
              checked={productParams.types}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ types: items }))
              }
            />
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
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
