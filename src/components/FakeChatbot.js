import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Fade,
  Avatar,
} from '@mui/material';

const categories = [
  { key: 'absence', label: { en: 'Absence Request', fr: 'Demande d’absence', ar: 'طلب غياب' } },
  { key: 'attestation', label: { en: 'Attestation Request', fr: 'Demande d’attestation', ar: 'طلب شهادة' } },
  { key: 'reclamation', label: { en: 'Reclamation', fr: 'Réclamation', ar: 'تظلم / شكوى' } },
  { key: 'update_info', label: { en: 'Update My Info', fr: 'Mettre à jour mes infos', ar: 'تحديث بياناتي' } },
  { key: 'formation', label: { en: 'Training Info', fr: 'Informations sur les formations', ar: 'معلومات التكوين' } },
  { key: 'announcement', label: { en: 'HR Announcements', fr: 'Annonces RH', ar: 'إعلانات الموارد البشرية' } },
];

const categoryQuestions = {
  absence: {
    en: 'How do I submit an absence request?',
    fr: 'Comment puis-je soumettre une demande d’absence ?',
    ar: 'كيف يمكنني تقديم طلب غياب؟',
  },
  attestation: {
    en: 'I need an attestation for work.',
    fr: 'J’ai besoin d’une attestation de travail.',
    ar: 'أحتاج إلى شهادة عمل.',
  },
  reclamation: {
    en: 'I want to file a reclamation.',
    fr: 'Je souhaite déposer une réclamation.',
    ar: 'أرغب في تقديم شكوى.',
  },
  update_info: {
    en: 'How can I update my personal information?',
    fr: 'Comment puis-je mettre à jour mes informations personnelles ?',
    ar: 'كيف يمكنني تحديث معلوماتي الشخصية؟',
  },
  formation: {
    en: 'What trainings are available for employees?',
    fr: 'Quelles sont les formations disponibles pour les employés ?',
    ar: 'ما هي التدريبات المتاحة للموظفين؟',
  },
  announcement: {
    en: 'What are the latest HR announcements?',
    fr: 'Quelles sont les dernières annonces RH ?',
    ar: 'ما هي آخر الإعلانات من قسم الموارد البشرية؟',
  },
};

const responses = {
  absence: {
    en: 'You can submit an absence request from the “Absence Request” section in your HR portal.',
    fr: 'Vous pouvez soumettre une demande d’absence depuis la section “Demande d’absence” de votre portail RH.',
    ar: 'يمكنك تقديم طلب غياب من قسم "طلب الغياب" في بوابتك.',
  },
  attestation: {
    en: 'Please specify the type of attestation you need. You can request it via the HR Attestations page.',
    fr: 'Veuillez préciser le type d’attestation souhaitée. Vous pouvez la demander depuis la page RH.',
    ar: 'يرجى تحديد نوع الشهادة المطلوبة. يمكنك طلبها من صفحة الموارد البشرية.',
  },
  reclamation: {
    en: 'To submit a reclamation, go to the “Reclamations” tab and fill in the form.',
    fr: 'Pour soumettre une réclamation, allez dans l’onglet “Réclamations” et remplissez le formulaire.',
    ar: 'لتقديم شكوى، انتقل إلى تبويب "التظلمات" واملأ النموذج.',
  },
  update_info: {
    en: 'You can update your info by going to your profile > personal data.',
    fr: 'Vous pouvez mettre à jour vos infos en allant sur votre profil > données personnelles.',
    ar: 'يمكنك تحديث معلوماتك من خلال ملفك الشخصي > البيانات الشخصية.',
  },
  formation: {
    en: 'You can view and register for available trainings in the “Formations” section.',
    fr: 'Vous pouvez consulter et vous inscrire aux formations disponibles dans la section “Formations”.',
    ar: 'يمكنك عرض التدريبات المتاحة والتسجيل من خلال قسم "التكوين".',
  },
  announcement: {
    en: 'Latest HR announcements can be found in the “HR Communication” section.',
    fr: 'Les dernières annonces RH se trouvent dans la section “Communication RH”.',
    ar: 'يمكنك الاطلاع على آخر إعلانات الموارد البشرية في قسم "إعلانات الموارد البشرية".',
  },
  default: {
    en: 'Thank you for your message. We will assist you shortly.',
    fr: 'Merci pour votre message. Nous allons vous aider sous peu.',
    ar: 'شكرًا لرسالتك. سنساعدك قريبًا.',
  },
};

const FakeChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('chat_history');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleCategoryClick = (key) => {
    const question = categoryQuestions[key][language];
    const newMessages = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    simulateResponse(key, newMessages);
  };

  const simulateResponse = (categoryKey, msgList) => {
    setLoading(true);
    setTimeout(() => {
      const response = (responses[categoryKey] && responses[categoryKey][language]) || responses.default[language];
      setMessages([...msgList, { role: 'assistant', content: response }]);
      setLoading(false);
    }, 1000);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chat_history');
  };

  const getTimeStamp = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, maxWidth: 600, mx: 'auto', borderRadius: '16px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">🤖 Assistant RH</Typography>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          size="small"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
        </Select>
      </Box>

      {messages.length === 0 && (
        <Fade in>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {categories.map((cat) => (
              <Button key={cat.key} variant="contained" onClick={() => handleCategoryClick(cat.key)}>
                {cat.label[language]}
              </Button>
            ))}
          </Box>
        </Fade>
      )}

      <List sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index} alignItems="flex-start">
            <Avatar sx={{ bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main' }}>
              {msg.role === 'user' ? '🧑' : '🤖'}
            </Avatar>
            <ListItemText primary={msg.content} sx={{ ml: 2 }} />
            <Typography variant="caption">{getTimeStamp()}</Typography>
          </ListItem>
        ))}
        {loading && (
          <ListItem>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>🤖</Avatar>
            <ListItemText
              primary={
                language === 'fr'
                  ? 'Le bot répond...'
                  : language === 'ar'
                  ? 'يكتب البوت...'
                  : 'Bot is typing...'
              }
              sx={{ ml: 2 }}
            />
            <CircularProgress size={18} sx={{ ml: 1 }} />
          </ListItem>
        )}
      </List>

      <Box textAlign="center">
        <Button onClick={clearHistory} variant="outlined" color="error">
          Clear Chat History
        </Button>
      </Box>
    </Paper>
  );
};

export default FakeChatbot;
