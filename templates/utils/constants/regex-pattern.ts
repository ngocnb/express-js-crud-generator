export default {
  // Check date is correct format (YYYY-MM-DD).
  date: /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/,

  // Check email is correct format.
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,

  // Check phone number is correct format. Example: 0123456789
  phoneNumber: /^[0-9]+$/,

  // Check username must not contain '@', 'space', 'full number' character.
  username: /^(?!^\d+$)(?!.*[@\s])[\w.]*$/,

  // To check if a tag starts with the '#' character.
  tag: /#[a-zA-Z0-9]+/g,

  // Check time correct
  time: /^([01]\d|2[0-3]):([0-5]\d)$/,
};
