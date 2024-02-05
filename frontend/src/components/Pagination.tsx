import Box from "@mui/material/Box";
import PaginationMui from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

type PaginationProps = {
  page: number;
  count: number;
  onPageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
  allowedLimits: number[];
  limit: number;
  onRowSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination = ({
  page,
  count,
  onPageChange,
  allowedLimits,
  limit,
  onRowSizeChange,
}: PaginationProps) => {
  return (
    <>
      <PaginationContainer>
        <PaginationMui count={count} page={page} onChange={onPageChange} />

        <Stack direction="row" gap={1} alignItems="center">
          <Typography variant="body1" my={2} color="#000">
            Row Size
          </Typography>
          <Box>
            <select value={limit} onChange={onRowSizeChange}>
              {allowedLimits.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Box>
        </Stack>
      </PaginationContainer>
    </>
  );
};

export default Pagination;

const PaginationContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: 'column',
  alignItems: "center",
  paddingTop: '1.5rem',
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "rgba(255, 255, 255, 0.6)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
}));
