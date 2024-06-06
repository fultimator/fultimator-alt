import {
  Divider,
  Grid,
  IconButton,
  TextField,
  useTheme,
  Paper,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useTranslate } from "../../../translation/translate";
import CustomHeader from "../../common/CustomHeader";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

export default function EditPlayerBonds({ player, setPlayer, isEditMode }) {
  const { t } = useTranslate();
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  /* Bond example:
        {
            name: "",
            admiration: false,
            loyality: false,
            affection: false,
            inferiority: false,
            mistrust: false,
            hatred: false,
        }

        if admiration, then not inferiority and vice versa
        if loyality, then not mistrust and vice versa
        if affection, then not hatred and vice versa

        Display the name of the bond and add 6 checkboxes to add the 6 types of bonds.

        There can be a maximum of 6 bonds for a player.
    */

  const handleBondChange = (index, key) => (event) => {
    const updatedBonds = player.info.bonds.map((bond, i) => {
      if (i === index) {
        const updatedBond = { ...bond, [key]: event.target.checked };
        if (key === "admiration" && event.target.checked) {
          updatedBond.inferiority = false;
        }
        if (key === "inferiority" && event.target.checked) {
          updatedBond.admiration = false;
        }
        if (key === "loyality" && event.target.checked) {
          updatedBond.mistrust = false;
        }
        if (key === "mistrust" && event.target.checked) {
          updatedBond.loyality = false;
        }
        if (key === "affection" && event.target.checked) {
          updatedBond.hatred = false;
        }
        if (key === "hatred" && event.target.checked) {
          updatedBond.affection = false;
        }
        return updatedBond;
      }
      return bond;
    });

    setPlayer((prevState) => ({
      ...prevState,
      info: { ...prevState.info, bonds: updatedBonds },
    }));
  };

  const handleBondNameChange = (index) => (event) => {
    const updatedBonds = player.info.bonds.map((bond, i) => {
      if (i === index) {
        return { ...bond, name: event.target.value };
      }
      return bond;
    });

    setPlayer((prevState) => ({
      ...prevState,
      info: { ...prevState.info, bonds: updatedBonds },
    }));
  };

  const addNewBond = () => {
    if (player.info.bonds.length >= 6) {
      return; // Prevent adding more than 6 bonds
    }

    const newBond = {
      name: "",
      admiration: false,
      loyality: false,
      affection: false,
      inferiority: false,
      mistrust: false,
      hatred: false,
    };

    setPlayer((prevState) => ({
      ...prevState,
      info: {
        ...prevState.info,
        bonds: [...prevState.info.bonds, newBond],
      },
    }));
  };

  const deleteBond = (index) => {
    const updatedBonds = player.info.bonds.filter((_, i) => i !== index);

    setPlayer((prevState) => ({
      ...prevState,
      info: { ...prevState.info, bonds: updatedBonds },
    }));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: "15px",
        borderRadius: "8px",
        border: "2px solid",
        borderColor: secondary,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomHeader
            type="top"
            headerText={t("Bonds")}
            addItem={isEditMode ? addNewBond : null}
          />
        </Grid>
        {player.info.bonds.map((bond, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box display="flex" alignItems="center">
                  {isEditMode ? <IconButton
                    aria-label="delete"
                    onClick={() => deleteBond(index)}
                    sx={{ ml: 1 }}
                  >
                    <RemoveCircleOutline />
                  </IconButton> : null}
                  <TextField
                    fullWidth
                    label={t("Bond Name")}
                    value={bond.name}
                    onChange={handleBondNameChange(index)}
                    InputProps={{
                      readOnly: !isEditMode,
                    }}
                    inputProps={{ maxLength: 50 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bond.admiration}
                          onChange={handleBondChange(index, "admiration")}
                          disabled={!isEditMode}
                        />
                      }
                      label={t("Admiration")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bond.loyality}
                          onChange={handleBondChange(index, "loyality")}
                          disabled={!isEditMode}
                        />
                      }
                      label={t("Loyality")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bond.affection}
                          onChange={handleBondChange(index, "affection")}
                          disabled={!isEditMode}
                        />
                      }
                      label={t("Affection")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bond.inferiority}
                          onChange={handleBondChange(index, "inferiority")}
                          disabled={!isEditMode}
                        />
                      }
                      label={t("Inferiority")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bond.mistrust}
                          onChange={handleBondChange(index, "mistrust")}
                          disabled={!isEditMode}
                        />
                      }
                      label={t("Mistrust")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bond.hatred}
                          onChange={handleBondChange(index, "hatred")}
                          disabled={!isEditMode}
                        />
                      }
                      label={t("Hatred")}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {index < player.info.bonds.length - 1 && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
