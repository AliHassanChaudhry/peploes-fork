# Booking account decisions

Production must connect to Gina's existing ResDiary venue and channel without
changing existing restaurant reservations or operations. Live gateway mapping,
card guarantees, December rules, confirmation-email ownership and provider
certification still require ResDiary and restaurant sign-off. A working simulated
journey does not settle those external decisions.

## Staging hosting

The selected staging Vercel project is `msf-projects/peploes-fork`, with `dev` as
its intended production branch. Gina's live project is separate. Keep staging
functions in Dublin, `dub1`, when replacing a manual deployment: the hosting
project's default was not changed when Dublin was selected. Confirm the current
hosted settings before release; an old preview URL is not deployment evidence.

## Historical test-diary setup

The staging acceptance setup used diary `3899`, “Peploes Test”. Its Credit Card
rule `1928` was changed from parties larger than eight to parties larger than six
to exercise a seven-person guarantee without changing the website's party limit.
Live Stripe settings remained off. Restore the threshold to eight when retiring
that test setup. This records a historical external-account change, not proof
that the account still has those settings. Check the diary before changing it;
this document grants no permission to mutate it.
