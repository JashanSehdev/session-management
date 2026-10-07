import { Box, Typography } from "@mui/material";
import styles from './page.module.css'

export default function TestPage(){


    return(
        <Box>
            <Typography className={styles.text}>This is test page</Typography>
        </Box>
    )
}