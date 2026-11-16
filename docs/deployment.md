(
  set -e

  read -rs "DATABASE_URL?Neon DATABASE_URL: "
  echo
  export DATABASE_URL

  read -r "BOOTSTRAP_ADMIN_EMAIL?Administrator email: "
  export BOOTSTRAP_ADMIN_EMAIL

  read -r "BOOTSTRAP_ADMIN_FIRST_NAME?Administrator first name: "
  export BOOTSTRAP_ADMIN_FIRST_NAME

  read -r "BOOTSTRAP_ADMIN_LAST_NAME?Administrator last name: "
  export BOOTSTRAP_ADMIN_LAST_NAME

  export BOOTSTRAP_ADMIN_CONFIRM=CREATE_PRODUCTION_ADMIN

  npm run db:bootstrap-admin
)