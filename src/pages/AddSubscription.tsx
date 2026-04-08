import { memo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useSubscriptionStore } from "../store/useSubscriptionStore";
import { useSubscriptionForm } from "../hooks/useSubscriptionForm";
import {
    cardVariants,
    containerVariants,
} from "../components/animations/variants";
import ArrowLeft from "../components/icons/ArrowLeft";
import PageHeader from "../components/ui/PageHeader";
import { cn } from "../utils/cn";
import { Corners } from "../components/ui/Corners";
import FormActions from "../components/subscriptionForm/FormActions";
import SubscriptionForm from "../components/subscriptionForm/SubscriptionForm";

const AddSubscription = memo(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSubscriptionById, addSubscription, updateSubscription } =
        useSubscriptionStore();

    const isEdit = Boolean(id);
    const existing = id ? getSubscriptionById(id) : undefined;
    const [saved, setSaved] = useState(false);

    const form = useSubscriptionForm(existing, (values) => {
        const payload = {
            name: values.name.trim(),
            category: values.category,
            cost: Number(values.cost),
            billingCycle: values.billingCycle,
            purchaseDate: new Date(values.purchaseDate).toISOString(),
            logo: values.logo || "📦",
            notes: values.notes,
        };
        if (isEdit && id) updateSubscription(id, payload);
        else addSubscription(payload);
        setSaved(true);
        setTimeout(() => navigate("/subscriptions"), 800);
    });

    const handleBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-2xl"
        >
            <PageHeader
                title={isEdit ? "Edit Subscription" : "Add Subscription"}
                subtitle={
                    isEdit ? "Update the details below" : "Track a new subscription"
                }
            />

            <motion.button
                variants={cardVariants}
                className={cn(
                    "w-fit pl-2 pr-10 py-1 flex items-center cursor-pointer gap-3",
                    " bg-linear-to-r from-(--color-surface) via-[#ffffff81] to-[#ffffff0f] ",
                )}
                onClick={handleBack}
                type="button"
            >
                <ArrowLeft /> Back
            </motion.button>

            <motion.div
                variants={cardVariants}
                className="p-6 relative bg-(--color-surface) border-[1.5px] border-dashed border-(--color-border-dashed) flex flex-col gap-5"
            >
                <Corners />

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >

                    <SubscriptionForm form={form} />

                    <FormActions
                        form={form}
                        isEdit={isEdit}
                        saved={saved}
                        handleBack={handleBack}
                    />
                </form>
            </motion.div>
        </motion.div>
    );
});

export default AddSubscription;
