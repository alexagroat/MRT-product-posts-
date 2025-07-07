"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_Row } from "material-react-table"
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputBase,
  InputLabel,
  IconButton,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Divider,
  useTheme,
  alpha,
  Stack,
  LinearProgress,
  Collapse,
} from "@mui/material"
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
  RateReviewOutlined as RateReviewOutlinedIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ExpandMore as ExpandMoreIcon,
  AssignmentIndOutlined as AssignmentIndOutlinedIcon,
  FilterAlt as FilterAltIcon,
  ExpandLess as ExpandLessIcon,
  DashboardCustomizeOutlined as DashboardCustomizeOutlinedIcon,
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  FiberNew as FiberNewIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  GetApp as GetAppIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  PendingActions as PendingActionsIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material"

// Types
type OfferStatus = "approved" | "missing_items" | "needs_review"
type LinkStatus = "active" | "inactive" | "pending"

interface Submission {
  id: string
  brandName: string
  submissionTitle: string // Specific title for the submission if different from offer
  postStatus: OfferStatus
  dueDate?: string
  link?: string
  linkStatus?: LinkStatus
  creatorPostRate: number // Post Rate of the Individual Creator
  memberStatus: "new_member" | "existing_member"
  orderCount: number
  creatorName: string
  submittedAt?: string
  extensionDate?: string
}

interface Offer {
  id: string
  offerTitle: string
  postRate: number // Overall for the offer (e.g., approved submissions / total submissions)
  quota: number
  averageStatus: OfferStatus
  reviewer?: string
  claimingPeriod: string // e.g., "2025-Q2", "2025-05"
  submissions: Submission[]
}

// Sample Data
const sampleOffers: Offer[] = [
  {
    id: "offer1",
    offerTitle: "Summer Skincare Essentials Collab",
    postRate: 0.75, // 75%
    quota: 50,
    averageStatus: "needs_review",
    reviewer: "Alice Wonderland",
    claimingPeriod: "2025-Q3",
    submissions: [
      {
        id: "sub1-1",
        brandName: "SunDay Glow",
        submissionTitle: "My Summer Glow Routine",
        postStatus: "needs_review",
        dueDate: "2025-07-15",
        link: "https://insta.example/post/1",
        linkStatus: "pending",
        creatorPostRate: 0.8,
        memberStatus: "existing_member",
        orderCount: 12,
        creatorName: "Eve Sunshine",
        submittedAt: "2025-07-14",
        extensionDate: "2025-07-20",
      },
      {
        id: "sub1-2",
        brandName: "Ocean Mist",
        submissionTitle: "Beach Day Hydration",
        postStatus: "approved",
        dueDate: "2025-07-10",
        link: "https://tiktok.example/post/2",
        linkStatus: "active",
        creatorPostRate: 0.9,
        memberStatus: "new_member",
        orderCount: 1,
        creatorName: "Chris Wave",
        submittedAt: "2025-07-09",
      },
    ],
  },
  {
    id: "offer2",
    offerTitle: "Tech Gadgets Showcase Q3",
    postRate: 0.5,
    quota: 30,
    averageStatus: "missing_items",
    reviewer: "Bob The Builder",
    claimingPeriod: "2025-Q3",
    submissions: [
      {
        id: "sub2-1",
        brandName: "Innovatech",
        submissionTitle: "Unboxing the Future",
        postStatus: "missing_items",
        dueDate: "2025-08-01",
        link: "https://youtube.example/post/3",
        linkStatus: "inactive",
        creatorPostRate: 0.6,
        memberStatus: "existing_member",
        orderCount: 5,
        creatorName: "TechReview Tom",
        submittedAt: "2025-07-30",
      },
    ],
  },
  {
    id: "offer3",
    offerTitle: "Artisan Coffee Subscription Launch",
    postRate: 1.0,
    quota: 20,
    averageStatus: "approved",
    reviewer: "Carol Danvers",
    claimingPeriod: "2025-Q2",
    submissions: [
      {
        id: "sub3-1",
        brandName: "Bean Supreme",
        submissionTitle: "My Morning Ritual with Bean Supreme",
        postStatus: "approved",
        dueDate: "2025-06-20",
        link: "https://blog.example/post/4",
        linkStatus: "active",
        creatorPostRate: 1.0,
        memberStatus: "new_member",
        orderCount: 3,
        creatorName: "Barista Ben",
        submittedAt: "2025-06-18",
      },
    ],
  },
]

// Visual Status Indicator Component
const VisualStatusIndicator = ({ status }: { status: OfferStatus }) => {
  const theme = useTheme()
  const statusConfig = {
    approved: {
      label: "Approved",
      icon: <CheckCircleOutlineIcon />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    missing_items: {
      label: "Missing Items",
      icon: <ReportProblemOutlinedIcon />,
      color: theme.palette.error.main, // Using error for more impact
      bgColor: alpha(theme.palette.error.main, 0.1),
    },
    needs_review: {
      label: "Needs Review",
      icon: <RateReviewOutlinedIcon />,
      color: theme.palette.info.main, // Using info for "needs review"
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
  }

  const config = statusConfig[status]

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{
        color: config.color,
        backgroundColor: config.bgColor,
        fontWeight: 600, // Bolder font
        border: `1px solid ${alpha(config.color, 0.3)}`,
        "& .MuiChip-icon": { color: config.color },
      }}
    />
  )
}

// Link Status Component
const LinkStatusChip = ({ status }: { status?: LinkStatus }) => {
  const theme = useTheme()
  if (!status)
    return (
      <Typography variant="caption" color="text.secondary">
        N/A
      </Typography>
    )

  const statusConfig = {
    active: {
      label: "Active",
      icon: <LinkIcon />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    inactive: {
      label: "Inactive",
      icon: <LinkOffIcon />,
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
    },
    pending: {
      label: "Error",
      icon: <WarningIcon />,
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
    },
  }
  const config = statusConfig[status]
  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{ color: config.color, backgroundColor: config.bgColor, fontWeight: 500 }}
    />
  )
}

// Main Table Component
export default function ClaimedOffersTable() {
  const theme = useTheme()
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<Offer[]>(sampleOffers) // For potential updates

  // Filters State
  const [claimingPeriodFilter, setClaimingPeriodFilter] = useState<string>("")
  const [offerFilter, setOfferFilter] = useState<string[]>([]) // For multi-select offer filter
  const [statusFilter, setStatusFilter] = useState<OfferStatus | "">("")
  const [reviewerFilter, setReviewerFilter] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("") // Global search for offer title

  // Table State
  const [rowSelection, setRowSelection] = useState({})
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedReviewerForAssign, setSelectedReviewerForAssign] = useState("")
  const [filtersExpanded, setFiltersExpanded] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const uniqueClaimingPeriods = useMemo(
    () => Array.from(new Set(sampleOffers.map((o) => o.claimingPeriod))),
    [sampleOffers],
  )
  const uniqueOfferTitles = useMemo(() => Array.from(new Set(sampleOffers.map((o) => o.offerTitle))), [sampleOffers])
  const uniqueReviewers = useMemo(
    () => Array.from(new Set(sampleOffers.map((o) => o.reviewer).filter(Boolean) as string[])),
    [sampleOffers],
  )

  const filteredData = useMemo(() => {
    return data.filter((offer) => {
      if (claimingPeriodFilter && offer.claimingPeriod !== claimingPeriodFilter) return false
      if (offerFilter.length > 0 && !offerFilter.includes(offer.offerTitle)) return false
      if (statusFilter && offer.averageStatus !== statusFilter) return false
      if (reviewerFilter && offer.reviewer !== reviewerFilter) return false
      if (searchTerm && !offer.offerTitle.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
  }, [data, claimingPeriodFilter, offerFilter, statusFilter, reviewerFilter, searchTerm])

  const handleAssignReviewer = useCallback(() => {
    const selectedOfferIds = Object.keys(rowSelection)
    setData((prevData) =>
      prevData.map((offer) =>
        selectedOfferIds.includes(offer.id) ? { ...offer, reviewer: selectedReviewerForAssign } : offer,
      ),
    )
    setAssignDialogOpen(false)
    setSelectedReviewerForAssign("")
    setRowSelection({})
  }, [rowSelection, selectedReviewerForAssign])

  // Main Offer Table Columns
  const offerColumns = useMemo<MRT_ColumnDef<Offer>[]>(
    () => [
      {
        accessorKey: "offerTitle",
        header: "Offer Title",
        size: 250,
        Cell: ({ cell }) => (
          <Typography variant="body1" fontWeight="medium">
            {cell.getValue<string>()}
          </Typography>
        ),
      },
      {
        accessorKey: "postRate",
        header: "Post Rate",
        size: 120,
        Cell: ({ cell }) => {
          const rate = cell.getValue<number>()
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: "70%" }}>
                <LinearProgress
                  variant="determinate"
                  value={rate * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        rate > 0.7
                          ? theme.palette.success.main
                          : rate > 0.4
                            ? theme.palette.warning.main
                            : theme.palette.error.main,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" fontWeight="medium" sx={{ minWidth: "30px" }}>
                {(rate * 100).toFixed(0)}%
              </Typography>
            </Box>
          )
        },
      },
      {
        accessorKey: "quota",
        header: "Total offers claimed",
        size: 100,
        Cell: ({ cell }) => (
          <Typography variant="body1" textAlign="center">
            {cell.getValue<number>()}
          </Typography>
        ),
      },
      {
        id: "needsReviewCount",
        header: "# of needs review",
        size: 180,
        Cell: ({ row }) => {
          const count = row.original.submissions.filter((sub) => sub.postStatus === "needs_review").length
          return (
            <Typography variant="body1" textAlign="center" fontWeight="medium">
              {count}
            </Typography>
          )
        },
      },
      {
        accessorKey: "reviewer",
        header: "Reviewer",
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue<string>() ? (
            <Chip
              label={cell.getValue<string>()}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.dark,
                fontWeight: 500,
              }}
            />
          ) : (
            <Typography variant="caption" color="textSecondary">
              Unassigned
            </Typography>
          ),
      },
    ],
    [theme],
  )

  // Submission (Detail Panel) Table Columns
  const submissionColumns = useMemo<MRT_ColumnDef<Submission>[]>(
    () => [
      { accessorKey: "creatorName", header: "Creator", size: 150 },
      {
        accessorKey: "postStatus",
        header: "Post Status",
        size: 180,
        Cell: ({ cell }) => <VisualStatusIndicator status={cell.getValue<OfferStatus>()} />,
      },
      { accessorKey: "dueDate", header: "Due Date", size: 120 },
      {
        accessorKey: "link",
        header: "Link",
        size: 100,
        Cell: ({ cell }) =>
          cell.getValue<string>() ? (
            <Tooltip title={cell.getValue<string>()}>
              <IconButton href={cell.getValue<string>()} target="_blank" size="small">
                <LinkIcon />
              </IconButton>
            </Tooltip>
          ) : (
            "N/A"
          ),
      },
      {
        accessorKey: "linkStatus",
        header: "Link Status",
        size: 120,
        Cell: ({ cell }) => <LinkStatusChip status={cell.getValue<LinkStatus>()} />,
      },
      {
        accessorKey: "creatorPostRate",
        header: "Creator Post Rate",
        size: 150,
        Cell: ({ cell }) => <Typography>{(cell.getValue<number>() * 100).toFixed(0)}%</Typography>,
      },
      {
        accessorKey: "memberStatus",
        header: "Member Status / Orders",
        size: 200,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {row.original.memberStatus === "new_member" && (
              <Tooltip title="New Member">
                <FiberNewIcon color="success" fontSize="small" />
              </Tooltip>
            )}
            <Typography variant="body2">{row.original.memberStatus === "new_member" ? "New" : "Existing"}</Typography>
            <Chip
              icon={<ShoppingCartCheckoutIcon fontSize="small" />}
              label={`${row.original.orderCount} orders`}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Box>
        ),
      },
      {
        accessorKey: "submittedAt",
        header: "Submitted at",
        size: 130,
        Cell: ({ cell }) => (
          <Typography variant="body2" color="text.secondary">
            {cell.getValue<string>() ? cell.getValue<string>() : "—"}
          </Typography>
        ),
      },
      {
        accessorKey: "extensionDate",
        header: "Extension Date",
        size: 130,
        Cell: ({ cell }) => (
          <Typography variant="body2" color="text.secondary">
            {cell.getValue<string>() ? cell.getValue<string>() : "—"}
          </Typography>
        ),
      },
    ],
    [theme],
  )

  const table = useMaterialReactTable({
    columns: offerColumns,
    data: mounted ? filteredData : [],
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    enableExpanding: true,
    renderDetailPanel: ({ row }: { row: MRT_Row<Offer> }) => (
      <Box sx={{ p: 2, backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.dark }}>
          Submissions for: {row.original.offerTitle}
        </Typography>
        <MaterialReactTable
          columns={submissionColumns}
          data={row.original.submissions}
          enableTopToolbar={false}
          enableBottomToolbar={false}
          enablePagination={false}
          muiTableProps={{ sx: { tableLayout: "fixed" } }}
        />
      </Box>
    ),
    muiTableContainerProps: { sx: { maxHeight: "700px", borderRadius: "8px", boxShadow: theme.shadows[2] } },
    muiTableHeadCellProps: { sx: { backgroundColor: alpha(theme.palette.primary.main, 0.05) } },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {Object.keys(rowSelection).length > 0 && (
          <Button
            variant="contained"
            startIcon={<AssignmentIndOutlinedIcon />}
            onClick={() => setAssignDialogOpen(true)}
            size="small"
          >
            Assign Reviewer ({Object.keys(rowSelection).length})
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<GetAppIcon />}
          onClick={() => {
            // Handle export functionality here
            console.log("Exporting all gift cards...")
            // You can implement CSV/Excel export logic here
          }}
          size="small"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: "0.5px",
            borderColor: theme.palette.text.secondary,
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            },
          }}
        >
          Export All Gift Cards
        </Button>
      </Box>
    ),
    initialState: { density: "compact" },
  })

  if (!mounted) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography>Loading Table...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", p: 2, backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <Paper sx={{ p: 2, mb: 2, borderRadius: "12px", boxShadow: theme.shadows[3] }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DashboardCustomizeOutlinedIcon color="primary" sx={{ fontSize: "28px" }} />
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Claimed Offers & Submissions
            </Typography>
          </Box>
          <IconButton onClick={() => setFiltersExpanded(!filtersExpanded)}>
            {filtersExpanded ? <ExpandLessIcon /> : <FilterAltIcon />}
          </IconButton>
        </Box>
        {/* Comprehensive Stats Dashboard */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: "12px", boxShadow: theme.shadows[3] }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 4 }}>
            {/* Left Section - Submission Stats */}
            <Box sx={{ flex: 1 }}>
              {/* Main Submission Metric */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: "24px" }} />
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                  1139/2253
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Submitted/Expected
              </Typography>

              {/* Status Breakdown */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.grey[500],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PendingActionsIcon sx={{ fontSize: "12px", color: "white" }} />
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    1114 (49%)
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.grey[800],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CancelIcon sx={{ fontSize: "12px", color: "white" }} />
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    69 (3%)
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.error.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WarningIcon sx={{ fontSize: "12px", color: "white" }} />
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    189 (8%)
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.warning.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WarningIcon sx={{ fontSize: "12px", color: "white" }} />
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    0 (0%)
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: "12px", color: "white" }} />
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    882 (39%)
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right Section - Content Metrics */}
            <Box sx={{ display: "flex", gap: 3 }}>
              {/* Additional Content */}
              <Box sx={{ textAlign: "center", minWidth: "120px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                  <AddIcon sx={{ color: theme.palette.primary.main, fontSize: "20px" }} />
                  <Typography variant="h5" fontWeight="bold" color="text.primary">
                    351
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Additional Content
                </Typography>
              </Box>

              {/* Admin Content */}
              <Box sx={{ textAlign: "center", minWidth: "120px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                  <AdminPanelSettingsIcon sx={{ color: theme.palette.success.main, fontSize: "20px" }} />
                  <Typography variant="h5" fontWeight="bold" color="text.primary">
                    13
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Admin Content
                </Typography>
              </Box>

              {/* Published Content */}
              <Box sx={{ textAlign: "center", minWidth: "120px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                  <VisibilityIcon sx={{ color: theme.palette.secondary.main, fontSize: "20px" }} />
                  <Typography variant="h5" fontWeight="bold" color="text.primary">
                    955
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Published Content
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
        <Collapse in={filtersExpanded}>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }} flexWrap="wrap" alignItems="center">
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel>Claiming Period</InputLabel>
              <Select
                value={claimingPeriodFilter}
                label="Claiming Period"
                onChange={(e) => setClaimingPeriodFilter(e.target.value)}
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="">All Periods</MenuItem>
                {uniqueClaimingPeriods.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel>Offer</InputLabel>
              <Select
                multiple
                value={offerFilter}
                label="Offer"
                onChange={(e) => setOfferFilter(e.target.value as string[])}
                renderValue={(selected) => (selected as string[]).join(", ")}
                IconComponent={ArrowDropDownIcon}
              >
                {uniqueOfferTitles.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value as OfferStatus | "")}
                IconComponent={ArrowDropDownIcon}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="missing_items">Missing Items</MenuItem>
                <MenuItem value="needs_review">Needs Review</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel>Reviewer</InputLabel>
              <Select
                value={reviewerFilter}
                label="Reviewer"
                onChange={(e) => setReviewerFilter(e.target.value)}
                IconComponent={ArrowDropDownIcon}
              >
                <MenuItem value="">All Reviewers</MenuItem>
                {uniqueReviewers.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                p: 0.5,
                borderRadius: "8px",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <SearchIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <InputBase
                placeholder="Search Offer Title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 200 }}
              />
            </Box>
          </Stack>
        </Collapse>
      </Paper>

      <MaterialReactTable table={table} />

      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: "12px" } }}
      >
        <DialogTitle sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AssignmentIndOutlinedIcon color="primary" />
            <Typography fontWeight="bold">Assign Reviewer</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, minWidth: 300 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a reviewer for the selected {Object.keys(rowSelection).length} offer(s).
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Select Reviewer</InputLabel>
            <Select
              value={selectedReviewerForAssign}
              label="Select Reviewer"
              onChange={(e) => setSelectedReviewerForAssign(e.target.value)}
            >
              {uniqueReviewers.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
              <MenuItem value="NewReviewer1">New Reviewer 1</MenuItem> {/* Example for adding new */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAssignReviewer}
            variant="contained"
            color="primary"
            disabled={!selectedReviewerForAssign}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
