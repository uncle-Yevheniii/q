import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import {
  Link as ReactRouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

type CombinedLinkProps = MuiLinkProps &
  RouterLinkProps & {
    to?: string;
  };

export default function Link(props: CombinedLinkProps) {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.to ?? "#"}>
      {props.children}
    </MuiLink>
  );
}
