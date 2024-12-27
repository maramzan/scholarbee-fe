export const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    bgcolor: '#F4F7FF',
    flex: 1,
    py: 3
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 3
  },
  sidebar: {
    width: { xs: '100%', md: 280 },
    bgcolor: 'white',
    borderRadius: 2,
    p: 2,
    height: 'fit-content'
  },
  mainContent: {
    flex: 1
  },
  listItem: {
    borderRadius: 2,
    mb: 1,
    '&:hover': {
      bgcolor: 'rgba(0, 0, 0, 0.04)'
    }
  },
  activeListItem: {
    borderRadius: 2,
    mb: 1,
    bgcolor: '#0B3C95',
    color: 'white',
    '&:hover': {
      bgcolor: '#0B3C95'
    }
  },
  icon: {
    minWidth: 40,
    color: 'inherit'
  },
  activeIcon: {
    minWidth: 40,
    color: 'white'
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      fontSize: '0.875rem',
      fontWeight: 500
    }
  },
  activeText: {
    '& .MuiListItemText-primary': {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'white'
    }
  },
  pageTitle: {
    fontWeight: 600,
    mb: 3
  },
  section: {
    mb: 3,
    borderRadius: 2,
    overflow: 'hidden'
  },
  sectionHeader: {
    p: 2
  },
  sectionTitle: {
    fontWeight: 600
  },
  sectionContent: {
    p: 2
  },
  applicationRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    '&:last-child': {
      mb: 0
    }
  },
  statusPending: {
    bgcolor: '#F5B700',
    color: 'white',
    px: 2,
    py: 0.5,
    borderRadius: 10,
    fontSize: '0.75rem',
    fontWeight: 500
  }
};
