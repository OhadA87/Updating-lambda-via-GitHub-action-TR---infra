const logout = (req, res) => {
  res.clearCookie('refreshToken', { httpOnly: true });
  res.status(200).json({ message: 'Logout successfully' });
};

export default logout;
