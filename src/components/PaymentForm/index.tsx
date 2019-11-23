// tslint:disable:no-magic-numbers
import { Button, Grid, MenuItem, Paper, TextField } from '@material-ui/core';
import dayJs from 'dayjs';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
// tslint:disable-next-line:no-import-side-effect
import 'react-credit-cards/es/styles-compiled.css';
import { useTranslation } from 'react-i18next';
import paymentSchema from '../../utils/schemas/payment';
import useStyles from './styles';

// TODO: move to another file
const months = [
  { value: 1, label: '01' },
  { value: 2, label: '02' },
  { value: 3, label: '03' },
  { value: 4, label: '04' },
  { value: 5, label: '05' },
  { value: 6, label: '06' },
  { value: 7, label: '07' },
  { value: 8, label: '08' },
  { value: 9, label: '09' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
];

const years: any[] = Array.from({ length: 15 }).map((item, index) => {
  const year = dayJs()
    .add(index, 'year')
    .year();

  return {
    label: String(year),
    value: year,
  };
});

const PaymentForm = () => {
  const classes = useStyles();

  const { t } = useTranslation();
  const [focus, setFocus] = useState(undefined);

  const [expiry, setExpiry] = useState('');

  const handleFocus = (e: any) => {
    setFocus(e.target.name);
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
  };

  return (
    <Formik
      validationSchema={paymentSchema}
      initialValues={{
        cvc: '',
        expiry: '',
        month: '',
        name: '',
        number: '',
        year: '',
      }}
      validateOnChange={false}
      onSubmit={handlePayment}
      render={({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => {
        const hasNumberError = Boolean(errors.number && touched.number);
        const hasNameError = Boolean(errors.name && touched.name);
        const hasCvcError = Boolean(errors.cvc && touched.cvc);
        const hasMonthError = Boolean(errors.month && touched.month);
        const hasYearError = Boolean(errors.year && touched.year);

        const updateExpiry = (e: any) => {
          e.persist();
          handleChange(e);

          const {
            target: { value, name },
          } = e;

          const [month = '', year = ''] = expiry.split('/');
          let updatedMonth = name === 'month' ? value : month;
          updatedMonth =
            String(updatedMonth).length === 1
              ? `0${updatedMonth}`
              : updatedMonth;
          const updatedYear = name === 'year' ? value : year;
          const updatedExpiry = `${updatedMonth}${updatedYear}`;

          setExpiry(updatedExpiry);
        };

        return (
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1} className={classes.root}>
              <Grid container xs={12} sm={9}>
                <Paper className={classes.paymentSection}>
                  <div className={classes.paymentCard}>
                    <Cards
                      cvc={values.cvc}
                      expiry={expiry}
                      focused={focus}
                      name={values.name}
                      number={values.number}
                    />
                  </div>
                  <div className={classes.paymentForm}>
                    <TextField
                      className={classes.paymentField}
                      helperText={errors.number}
                      error={hasNumberError}
                      variant="outlined"
                      required
                      fullWidth
                      id="number"
                      label={t('payment.cardNumber')}
                      name="number"
                      value={values.number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                    />
                    <TextField
                      className={classes.paymentField}
                      helperText={errors.name}
                      error={hasNameError}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label={t('payment.nameOnACard')}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                    />

                    <div className={classes.cvcAndExpiry}>
                      <div className={classes.expiry}>
                        <TextField
                          id="month"
                          error={hasMonthError}
                          className={classes.selectField}
                          select
                          required
                          label={t('payment.month')}
                          name="month"
                          helperText={errors.month}
                          value={values.month}
                          onChange={updateExpiry}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          margin="normal"
                          variant="outlined"
                        >
                          {months.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          id="year"
                          select
                          required
                          error={hasYearError}
                          className={classes.selectField}
                          label={t('payment.year')}
                          name="year"
                          value={values.year}
                          helperText={errors.year}
                          onChange={updateExpiry}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          margin="normal"
                          variant="outlined"
                        >
                          {years.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className={classes.cvc}>
                        <TextField
                          type="text"
                          helperText={errors.cvc}
                          error={hasCvcError}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          className={classes.paymentField}
                          id="cvc"
                          label={t('payment.cvc')}
                          name="cvc"
                          value={values.cvc}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                        />
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.gridSidebar}>
                <Paper className={classes.summarySidebar}>
                  <Button
                    // disabled={}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    {t('checkout.buyNow')}
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </form>
        );
      }}
    />
  );
};

// tslint:disable-next-line:max-file-line-count
export default PaymentForm;
