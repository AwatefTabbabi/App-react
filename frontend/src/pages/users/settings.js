import React, { useState } from "react";
import { TextField, Button, Switch, FormControlLabel, Typography, Box, Divider } from "@mui/material";
import "./setings.css";
const SecuritySettings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert("Mot de passe mis à jour avec succès !");
    setPassword("");
    setNewPassword("");
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Sécurité</Typography>
      <form onSubmit={handlePasswordChange}>
        <TextField
          label="Mot de passe actuel"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Nouveau mot de passe"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Modifier le mot de passe
        </Button>
      </form>
      <Divider sx={{ my: 4 }} />
      <FormControlLabel
        control={<Switch checked={enable2FA} onChange={() => setEnable2FA(!enable2FA)} />}
        label="Activer l'authentification à deux facteurs (2FA)"
      />
    </Box>
  );
};

const PreferencesSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Préférences</Typography>
      <FormControlLabel
        control={<Switch checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />}
        label="Recevoir des notifications par e-mail"
      />
    </Box>
  );
};

const Settings = () => {
  return (
    <Box p={4}>
      <SecuritySettings />
      <Divider sx={{ my: 4 }} />
      <PreferencesSettings />
    </Box>
  );
};

export default Settings;
