import { useState } from 'react';
import { Heart, DollarSign, User, MapPin, Phone, Gift, Check, Loader2, Globe } from 'lucide-react';
import Header from '../components/Header';
import image from '../assets/image6.jpg';
import { createDonation } from '../services/donationService';
import {
    CURRENCIES,
    COUNTRIES,
    POPULAR_CURRENCY_CODES,
    POPULAR_COUNTRY_CODES,
    formatAmount,
    getCurrencySymbol,
} from '../data/donationData';

const PRESET_AMOUNTS = [25, 50, 100, 200, 300, 500, 750, 1000, 1500, 3000];

const PROGRAM_AREAS = [
    { id: 'education', label: 'Education' },
    { id: 'wash', label: 'Public Health Engineering / WASH' },
    { id: 'leadership', label: 'Leadership & Peace Building' },
    { id: 'environment', label: 'Environment' },
    { id: 'general', label: 'General Fund (Greatest Need)' },
];

const popularCurrencies = CURRENCIES.filter(c => POPULAR_CURRENCY_CODES.includes(c.code));
const otherCurrencies = CURRENCIES.filter(c => !POPULAR_CURRENCY_CODES.includes(c.code));

const popularCountries = COUNTRIES.filter(c => POPULAR_COUNTRY_CODES.includes(c.code));
const otherCountries = COUNTRIES.filter(c => !POPULAR_COUNTRY_CODES.includes(c.code));

const Donate = () => {
    const [frequency, setFrequency] = useState<'monthly' | 'once'>('monthly');
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [displayPublicly, setDisplayPublicly] = useState(false);
    const [dedicateDonation, setDedicateDonation] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState('general');
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        street: '',
        city: '',
        adminDivision: '',
        phone: '',
        dedicateTo: '',
    });

    const effectiveAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    const currencySymbol = getCurrencySymbol(selectedCurrency);
    const selectedCountry = COUNTRIES.find(c => c.code === formData.country);

    const handleAmountClick = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        if (value) setSelectedAmount(null);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCountryChange = (countryCode: string) => {
        setFormData(prev => ({ ...prev, country: countryCode, adminDivision: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!effectiveAmount || effectiveAmount <= 0) return;

        setSubmitting(true);
        try {
            await createDonation({
                firstName: formData.firstName || 'Anonymous',
                lastName: formData.lastName || 'Donor',
                country: formData.country,
                street: formData.street,
                city: formData.city,
                state: formData.adminDivision,
                adminDivision: formData.adminDivision,
                phone: formData.phone,
                currency: selectedCurrency,
                amount: effectiveAmount,
                frequency,
                programArea: selectedProgram,
                displayPublicly,
                dedicateTo: dedicateDonation ? formData.dedicateTo : null,
            });
        } catch (err) {
            console.error('Failed to save donation record:', err);
        }

        window.location.href = 'https://buy.stripe.com/3cIfZi6Jj4BfcNm6QPbAs02';
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                title="Donate"
                linkTitle="Donate"
                linkHref="/donate"
                backgroundImage={image}
            />

            {/* Hero Message */}
            <section className="py-12 md:py-16 bg-gradient-to-br from-green-600 via-green-700 to-sky-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-6">
                        <Heart className="w-4 h-4 fill-current" />
                        Your generosity changes lives
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Make an Impact Today! <span className="inline-block animate-pulse">❤️</span>
                    </h2>
                    <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
                        Every dollar you give empowers refugees and underserved communities through education in Rwanda, engineering solutions, and sustainable development.
                    </p>
                </div>
            </section>

            {/* Donation Form */}
            <section className="py-12 md:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <form onSubmit={handleSubmit}>

                        {/* Frequency Toggle */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-5">Choose your giving frequency</h3>
                            <div className="flex bg-gray-100 rounded-xl p-1.5 max-w-sm">
                                <button
                                    type="button"
                                    onClick={() => setFrequency('once')}
                                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 border-none cursor-pointer ${frequency === 'once'
                                        ? 'bg-white text-gray-900 shadow-md'
                                        : 'bg-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Give Once
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFrequency('monthly')}
                                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 border-none cursor-pointer flex items-center justify-center gap-1.5 ${frequency === 'monthly'
                                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                                        : 'bg-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Monthly <Heart className="w-3.5 h-3.5 fill-current" />
                                </button>
                            </div>
                            {frequency === 'monthly' && (
                                <p className="mt-3 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg inline-block">
                                    ✨ Monthly giving creates lasting, sustainable impact!
                                </p>
                            )}
                        </div>

                        {/* Amount Selection */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
                            {/* Title + Currency selector */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                                <h3 className="text-xl font-bold text-gray-900">Choose an amount</h3>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <select
                                        value={selectedCurrency}
                                        onChange={e => setSelectedCurrency(e.target.value)}
                                        className="pl-2 pr-8 py-2 border-2 border-gray-200 rounded-lg text-sm font-semibold text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none bg-white cursor-pointer"
                                    >
                                        <optgroup label="Popular">
                                            {popularCurrencies.map(c => (
                                                <option key={c.code} value={c.code}>{c.code} – {c.name}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="All currencies">
                                            {otherCurrencies.map(c => (
                                                <option key={c.code} value={c.code}>{c.code} – {c.name}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                                {PRESET_AMOUNTS.map(amount => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => handleAmountClick(amount)}
                                        className={`relative py-4 px-3 rounded-xl font-bold text-base transition-all duration-300 border-2 cursor-pointer ${selectedAmount === amount && !customAmount
                                            ? 'border-green-600 bg-green-50 text-green-700 shadow-md scale-[1.02]'
                                            : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50/50'
                                            }`}
                                    >
                                        <span className="block text-xs font-medium text-gray-400 mb-0.5">{selectedCurrency}</span>
                                        {amount.toLocaleString()}
                                        {selectedAmount === amount && !customAmount && (
                                            <span className="absolute top-2 right-2">
                                                <Check className="w-4 h-4 text-green-600" />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount */}
                            <div className="relative flex items-stretch">
                                <span className="inline-flex items-center px-4 border-2 border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-gray-600 font-semibold text-sm select-none">
                                    {currencySymbol.length <= 3 ? currencySymbol : selectedCurrency}
                                </span>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter custom amount"
                                    value={customAmount}
                                    onChange={e => handleCustomAmountChange(e.target.value)}
                                    className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-r-xl text-lg font-semibold text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                                />
                            </div>
                        </div>

                        {/* Program Designation */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Designate your donation</h3>
                            <p className="text-gray-500 text-sm mb-5">Choose which program area your donation supports</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {PROGRAM_AREAS.map(program => (
                                    <button
                                        key={program.id}
                                        type="button"
                                        onClick={() => setSelectedProgram(program.id)}
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 border-2 cursor-pointer ${selectedProgram === program.id
                                            ? 'border-sky-600 bg-sky-50 text-sky-700'
                                            : 'border-gray-200 bg-white text-gray-700 hover:border-sky-300'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedProgram === program.id ? 'border-sky-600 bg-sky-600' : 'border-gray-300'}`}>
                                            {selectedProgram === program.id && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="font-medium text-sm">{program.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Donor Information */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
                            <div className="flex items-center gap-2 mb-5">
                                <User className="w-5 h-5 text-sky-600" />
                                <h3 className="text-xl font-bold text-gray-900">Your Information</h3>
                            </div>

                            {/* Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={e => handleInputChange('firstName', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={e => handleInputChange('lastName', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            {/* Country */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    <Globe className="w-4 h-4 inline mr-1 text-gray-400" />
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.country}
                                    onChange={e => handleCountryChange(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all bg-white cursor-pointer"
                                >
                                    <option value="">Select your country…</option>
                                    <optgroup label="Popular">
                                        {popularCountries.map(c => (
                                            <option key={c.code} value={c.code}>{c.name}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="All countries">
                                        {otherCountries.map(c => (
                                            <option key={c.code} value={c.code}>{c.name}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>

                            {/* Street */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    <MapPin className="w-4 h-4 inline mr-1 text-gray-400" />
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    value={formData.street}
                                    onChange={e => handleInputChange('street', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                                    placeholder="123 Main St"
                                />
                            </div>

                            {/* City + Phone */}
                            <div className={`grid gap-4 mb-4 ${selectedCountry?.admin ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={e => handleInputChange('city', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        <Phone className="w-4 h-4 inline mr-1 text-gray-400" />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => handleInputChange('phone', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            {/* Administrative Division — conditional */}
                            {selectedCountry?.admin && (
                                <div className="mb-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        {selectedCountry.admin.label}
                                    </label>
                                    <select
                                        value={formData.adminDivision}
                                        onChange={e => handleInputChange('adminDivision', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all bg-white cursor-pointer"
                                    >
                                        <option value="">Select {selectedCountry.admin.label}…</option>
                                        {selectedCountry.admin.divisions.map(div => (
                                            <option key={div} value={div}>{div}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Additional Options */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-5">Additional Options</h3>

                            <label className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    checked={displayPublicly}
                                    onChange={e => setDisplayPublicly(e.target.checked)}
                                    className="mt-0.5 w-5 h-5 accent-green-600 cursor-pointer"
                                />
                                <div>
                                    <span className="font-semibold text-gray-900 block">Display my name publicly</span>
                                    <span className="text-sm text-gray-500">Your name will appear on our donor recognition wall</span>
                                </div>
                            </label>

                            <label className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={dedicateDonation}
                                    onChange={e => setDedicateDonation(e.target.checked)}
                                    className="mt-0.5 w-5 h-5 accent-green-600 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                                        <Gift className="w-4 h-4 text-green-600" />
                                        Dedicate this donation
                                    </span>
                                    <span className="text-sm text-gray-500 block">Make this gift in honor or memory of someone special</span>
                                </div>
                            </label>

                            {dedicateDonation && (
                                <div className="mt-3 ml-12">
                                    <input
                                        type="text"
                                        value={formData.dedicateTo}
                                        onChange={e => handleInputChange('dedicateTo', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                        placeholder="In honor of…"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Your {frequency === 'monthly' ? 'monthly' : 'one-time'} gift</span>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-green-700">
                                        {effectiveAmount ? formatAmount(effectiveAmount, selectedCurrency) : '—'}
                                    </span>
                                    {effectiveAmount && (
                                        <p className="text-xs text-gray-400 mt-0.5">{selectedCurrency}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!effectiveAmount || effectiveAmount <= 0 || submitting}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 border-none cursor-pointer flex items-center justify-center gap-2 ${effectiveAmount && effectiveAmount > 0 && !submitting
                                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 hover:-translate-y-0.5'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {submitting ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
                                ) : (
                                    <>
                                        <Heart className="w-5 h-5" />
                                        {effectiveAmount && effectiveAmount > 0
                                            ? `Complete ${frequency === 'monthly' ? 'Monthly ' : ''}Donation — ${formatAmount(effectiveAmount, selectedCurrency)}`
                                            : 'Choose an Amount'
                                        }
                                    </>
                                )}
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                🔒 Secure payment powered by Stripe. Engineers4Humanity is a 501(c)(3) nonprofit. Your donation is tax-deductible.
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-12 bg-gradient-to-r from-sky-600 to-green-600 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <p className="text-3xl md:text-4xl font-bold mb-1">500+</p>
                            <p className="text-sm opacity-90">Students Graduated</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold mb-1">250+</p>
                            <p className="text-sm opacity-90">Vocational Trainees</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold mb-1">2000+</p>
                            <p className="text-sm opacity-90">Lives Changed</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold mb-1">17+</p>
                            <p className="text-sm opacity-90">Years of Service</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Donate;
