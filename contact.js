const enquiry = document.getElementById('enquiry-form');
const preference = document.getElementById('contact-preference');
const visitorEmail = document.getElementById('visitor-email');
const visitorPhone = document.getElementById('visitor-phone');
function syncContactFields() {
  const emailPreferred = preference.value === 'Email';
  visitorEmail.required = emailPreferred;
  visitorPhone.required = !emailPreferred;
  document.getElementById('email-note').textContent = emailPreferred ? '(required)' : '(optional)';
  document.getElementById('phone-note').textContent = emailPreferred ? '(optional)' : '(required)';
}
function validatePhone() {
  const value = visitorPhone.value.trim();
  const digits = value.replace(/\D/g, '');
  visitorPhone.setCustomValidity(value && (!/^[+\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15) ? 'Enter a valid phone number with 7–15 digits, including your country code.' : '');
}
preference.addEventListener('change', syncContactFields);
visitorPhone.addEventListener('input', validatePhone);
syncContactFields();
window.addEventListener('pageshow', syncContactFields);
document.getElementById('send-whatsapp').addEventListener('click', () => {
  validatePhone();
  if (!enquiry.reportValidity()) return;
  const name = document.getElementById('visitor-name').value.trim();
  const message = document.getElementById('visitor-message').value.trim();
  const draft = `Hi Dishant, I’m ${name}.\nPreferred contact: ${preference.value}\nEmail: ${visitorEmail.value.trim() || 'Not supplied'}\nPhone: ${visitorPhone.value.trim() || 'Not supplied'}\n\n${message}`;
  window.open(`https://wa.me/918076632532?text=${encodeURIComponent(draft)}`, '_blank', 'noopener,noreferrer');
});
