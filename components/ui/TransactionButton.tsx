import React from 'react'
import { Button } from './button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from './field'
import { Input } from './input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from './textarea'

const TransactionButton = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger type="button" className='flex items-center border-2 rounded-xl px-4 py-2'>
          <Plus className="mr-2" /><span>Add Transaction</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="amount">Amount</FieldLabel>
                    <Input id="amount" type="text" placeholder="Enter amount" />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
            <div>
              <FieldGroup>
                <Field className='grid-cols-2'>
                  <FieldLabel htmlFor="amount">Type</FieldLabel>
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='w-full'>
                      <Button className='w-full bg-green-400 text-gray-600'>Income</Button>
                    </div>
                    <div className='w-full'>
                      <Button className='w-full bg-red-400 text-gray-600'>Expense</Button>
                    </div>
                  </div>
                </Field>
              </FieldGroup>
            </div>
          </div>
          <Field className="w-full max-w-xs">
            <FieldLabel>Category</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="engineering">Food</SelectItem>
                  <SelectItem value="design">Rent</SelectItem>
                  <SelectItem value="marketing">Salary</SelectItem>
                  <SelectItem value="sales">Entertainment</SelectItem>
                  <SelectItem value="support">Transport</SelectItem>
                  <SelectItem value="hr">Utilities</SelectItem>
                  <SelectItem value="finance">Freelance</SelectItem>
                  <SelectItem value="operations">Shopping</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>
              Select the category of your transaction.
            </FieldDescription>
          </Field>
          <Field className="w-full max-w-xs">
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" placeholder="Enter description" />
          </Field>
          <Field className="w-full max-w-xs">
            <FieldLabel htmlFor="date">Date</FieldLabel>
            <Input id="date" type="date" />
          </Field>
          <Button className='mt-4'><Plus className="mr-2" /> Add Transaction</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TransactionButton