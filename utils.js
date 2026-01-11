export default function formatDate (dateString) {
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long', 
  }).format(date);
};


