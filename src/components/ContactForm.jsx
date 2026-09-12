import { useState } from 'react';
import Icon from './Icon';

const initialValues = { name: '', email: '', subject: '', message: '' };

function validateField(name, value) {
  const trimmed = value.trim();
  if (name === 'name' && !trimmed) return 'Please enter your name.';
  if (name === 'email' && !trimmed) return 'Please enter your email.';
  if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address.';
  if (name === 'subject' && !trimmed) return 'Please add a subject.';
  if (name === 'message' && !trimmed) return 'Please tell me a little about your project.';
  if (name === 'message' && trimmed.length < 20) return 'Please add at least 20 characters.';
  return undefined;
}

function validate(values) {
  return Object.entries(values).reduce((nextErrors, [name, value]) => {
    const error = validateField(name, value);
    if (error) nextErrors[name] = error;
    return nextErrors;
  }, {});
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (touched[name]) setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    if (submitted) setSubmitted(false);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setTouched({ name: true, email: true, subject: true, message: true });
      const firstError = Object.keys(nextErrors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }
    setSubmitted(true);
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate data-reveal>
      {submitted && (
        <div className="form-success" role="status">
          <span><Icon name="check" size={17} /></span>
          <div>
            <strong>Thanks—your message is ready.</strong>
            <p>This demo doesn’t send data, but Alex can be reached directly by email.</p>
          </div>
        </div>
      )}
      <div className="form-row">
        <Field label="Your name" name="name" value={values.name} error={errors.name} onChange={handleChange} onBlur={handleBlur} placeholder="Jane Smith" autoComplete="name" required />
        <Field label="Email address" name="email" type="email" value={values.email} error={errors.email} onChange={handleChange} onBlur={handleBlur} placeholder="jane@company.com" autoComplete="email" required />
      </div>
      <Field label="Subject" name="subject" value={values.subject} error={errors.subject} onChange={handleChange} onBlur={handleBlur} placeholder="A new project inquiry" required />
      <Field label="Tell me about it" name="message" value={values.message} error={errors.message} onChange={handleChange} onBlur={handleBlur} placeholder="A little about your project, timeline, and what success looks like…" multiline minLength={20} maxLength={600} showCount required />
      <div className="contact-form__footer">
        <p>By submitting, you acknowledge this is a frontend demo form.</p>
        <button className="button button--primary" type="submit">Send message <Icon name="arrowUpRight" size={18} /></button>
      </div>
    </form>
  );
}

function Field({ label, name, error, multiline = false, showCount = false, value = '', ...props }) {
  const Component = multiline ? 'textarea' : 'input';
  const describedBy = [error ? `${name}-error` : '', showCount ? `${name}-count` : ''].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <Component id={name} name={name} value={value} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props} />
      {(error || showCount) && (
        <span className="field__meta">
          {error ? <span className="field__error" id={`${name}-error`} role="alert">{error}</span> : <span />}
          {showCount && <span className="field__count" id={`${name}-count`}>{value.length}/600</span>}
        </span>
      )}
    </div>
  );
}
