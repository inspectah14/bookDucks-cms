module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7978b4b9551bb2e6cd3f869513103ac7'),
  },
});
