import theme from "@config/theme";
import { createMakeStyles } from "tss-react";

function useTheme(){
  return theme;
}

export const { 
  makeStyles, 
  useStyles //<- To use when you need css or cx but don't have custom classes 
} = createMakeStyles({ useTheme })