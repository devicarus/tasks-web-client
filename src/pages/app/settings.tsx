import { useFormContext, useFieldContext, withForm, useAppForm } from "@/hooks/form";

function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();

  return (
    <label>
      <div>{label}</div>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  );
}

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
    </form.Subscribe>
  );
}

const ChildForm = withForm({
  // These values are only used for type-checking, and are not used at runtime
  // This allows you to `...formOpts` from `formOptions` without needing to redeclare the options
  defaultValues: {
    firstName: "John",
    lastName: "Doe",
  },
  // Optional, but adds props to the `render` function in addition to `form`
  props: {
    // These props are also set as default values for the `render` function
    title: "Child Form",
  },
  render: function Render({ form, title }) {
    return (
      <div>
        <p>{title}</p>
        <form.AppField name="firstName">
          {(field) => <field.TextField label="First Name" />}
        </form.AppField>
        <form.AppField name="lastName">
          {(field) => <field.TextField label="Last Name" />}
        </form.AppField>
        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </div>
    );
  },
});

export default function AppSettingsPage() {
  const form = useAppForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
    },
  });

  return <ChildForm form={form} title={"Testing"} />;
}
