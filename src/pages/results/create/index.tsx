import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createResult } from 'apiSdk/results';
import { Error } from 'components/error';
import { resultValidationSchema } from 'validationSchema/results';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SwimmerInterface } from 'interfaces/swimmer';
import { MeetInterface } from 'interfaces/meet';
import { getSwimmers } from 'apiSdk/swimmers';
import { getMeets } from 'apiSdk/meets';
import { ResultInterface } from 'interfaces/result';

function ResultCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ResultInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createResult(values);
      resetForm();
      router.push('/results');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ResultInterface>({
    initialValues: {
      time: 0,
      swimmer_id: (router.query.swimmer_id as string) ?? null,
      meet_id: (router.query.meet_id as string) ?? null,
    },
    validationSchema: resultValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="time" mb="4" isInvalid={!!formik.errors?.time}>
            <FormLabel>Time</FormLabel>
            <NumberInput
              name="time"
              value={formik.values?.time}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('time', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.time && <FormErrorMessage>{formik.errors?.time}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<SwimmerInterface>
            formik={formik}
            name={'swimmer_id'}
            label={'Select Swimmer'}
            placeholder={'Select Swimmer'}
            fetcher={getSwimmers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.first_name}
              </option>
            )}
          />
          <AsyncSelect<MeetInterface>
            formik={formik}
            name={'meet_id'}
            label={'Select Meet'}
            placeholder={'Select Meet'}
            fetcher={getMeets}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'result',
  operation: AccessOperationEnum.CREATE,
})(ResultCreatePage);
