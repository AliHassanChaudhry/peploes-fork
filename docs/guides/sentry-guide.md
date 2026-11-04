# Sentry account selection

The approved staging project is `truedevs-jw/peploes-staging`. The original
checkout's `prs-td` DSN belongs to another product. Earlier verification used
`truedevs-rn/peploes`; those historical settings are not a production-account
selection. Obtain owner approval before choosing the live destination.

The staging build token named `peploes-staging-build` has organization-wide
`org:ci` permission even though builds target only the staging project. Keep
that access boundary in mind when replacing or revoking it; never publish the
token value. Hosted capture and owner acceptance remain tracked in #78.
