import { Box, Pagination, Typography } from '@mui/material';
import { MetaData } from '../models/pagination';

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;

  const firstItemNumber = (currentPage - 1) * pageSize + 1;
  const lastItemNumber =
    currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Typography>
        Displaying {firstItemNumber}-{lastItemNumber} of {totalCount} items
      </Typography>
      <Pagination
        color='secondary'
        size='large'
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
      />
    </Box>
  );
}
