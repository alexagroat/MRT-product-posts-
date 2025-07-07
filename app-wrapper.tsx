"use client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "./theme"
import ClaimedOffersTable from "./claimed-offers-table"

export default function AppWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClaimedOffersTable />
    </ThemeProvider>
  )
}
