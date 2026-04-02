import PlusCircle from "../icons/PlusCircle";
import Save from "../icons/Save";
import Button from "../ui/Button";


const FormActions = ({ form, isEdit, saved, handleBack }: any) => {
    return (

        <div className="flex items-center gap-3 pt-2">
            <form.Subscribe selector={(s: any) => s.canSubmit}>
                {(canSubmit: boolean) => (
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => form.handleSubmit()}
                        disabled={!canSubmit}
                        icon={saved ? <Save /> : <PlusCircle />}
                    >
                        {saved
                            ? "Saved!"
                            : isEdit
                                ? "Update Subscription"
                                : "Add Subscription"}
                    </Button>
                )}
            </form.Subscribe>
            <Button variant="ghost" size="lg" onClick={handleBack}>
                Cancel
            </Button>
        </div>
    );
};

export default FormActions;