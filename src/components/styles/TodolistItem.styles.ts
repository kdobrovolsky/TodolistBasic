import { Button, styled, SxProps } from "@mui/material";

type Props = {
    background?: string
}

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    
  }

  export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
  })

 
  export const NavButton = styled(Button)<Props>(({ background }) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || '#1565c0',
  }))