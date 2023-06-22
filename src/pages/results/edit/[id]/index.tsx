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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getResultById, updateResultById } from 'apiSdk/results';
import { Error } from 'components/error';
import { resultValidationSchema } from 'validationSchema/results';
import { ResultInterface } from 'interfaces/result';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SwimmerInterface } from 'interfaces/swimmer';
import { MeetInterface } from 'interfaces/meet';
import { getSwimmers } from 'apiSdk/swimmers';
import { getMeets } from 'apiSdk/meets';

function ResultEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ResultInterface>(
    () => (id ? `/results/${id}` : null),
    () => getResultById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ResultInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateResultById(id, values);
      mutate(updated);
      resetForm();
      router.push('/results');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ResultInterface>({
    initialValues: data,
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
            Edit Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'result',
  operation: AccessOperationEnum.UPDATE,
})(ResultEditPage);
