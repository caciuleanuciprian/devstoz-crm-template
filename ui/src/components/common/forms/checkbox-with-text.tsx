"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";
import { InputCheckbox } from "./input";

interface CheckboxWithTextProps {
	name?: string;
	label: string;
	sublabel?: string;
	checked?: boolean;
	onCheckedChange?: (params?: any) => void;
}

export function CheckboxWithText({
	name,
	label,
	sublabel,
	checked,
	onCheckedChange,
}: CheckboxWithTextProps) {
	console.log(name, label, sublabel, checked, onCheckedChange);

	const handleCheckedChange = (checked: boolean) => {
		if (onCheckedChange) {
			onCheckedChange(checked);
		}
	};

	return (
		<div className="items-top flex space-x-2">
			<Checkbox
				id={name}
				name={name}
				checked={checked}
				onCheckedChange={(checked) => handleCheckedChange(!checked)}
			/>
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor={name}
					className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{label}
				</label>
				<p className="text-sm text-muted-foreground">{sublabel}</p>
			</div>
		</div>
	);
}

type CheckboxWithTextPropsForm = {
	name: string;
	label: string;
	sublabel?: string;
	checked?: boolean;
	onCheckedChange?: (params?: any) => void;
	isLoading?: boolean;
	isDisabled?: boolean;
	defaultValue?: string;
	placeholder?: string;
};

export function CheckboxInputWithText(props: CheckboxWithTextPropsForm) {
	const { label, name, ...rest } = props;
	return (
		<div className="flex items-center gap-2">
			<InputCheckbox {...props} />
			<Label htmlFor={name} className="text-sm">
				{label}
			</Label>
		</div>
	);
}
